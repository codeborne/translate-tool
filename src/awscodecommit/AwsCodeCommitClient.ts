import type {Author, VersionControlClient} from '../common/VersionControlClient'
import type {AwsProject, Dict} from '../common/Project'
import {LoadedProject} from '../common/Project'
import {rebuildDictInOrder} from '../editor/rebuildDictInOrder'
import {getBaseUrl} from '../common/utils'
import {CodeCommit} from '@aws-sdk/client-codecommit'

export class AwsCodeCommitClient implements VersionControlClient {
  branch = 'translations'
  icon = 'fab fa-amazon'
  label = 'AWS CodeCommit'
  author: Author = {name: 'Translate Tool', email: 'translate@codeborne.com'}
  client: CodeCommit

  constructor(public config: AwsProject) {
    this.branch = config.branch

    const credentials = {
      region: config.region,
      credentials: {
        secretAccessKey: config.secretAccessKey,
        accessKeyId: config.accessKeyId,
        sessionToken: config.sessionToken ? config.sessionToken : undefined
      }
    }

    this.client = new CodeCommit(credentials)
  }

  getSourceUrl(defaultBranch: string, lang: string): string {
    const {url, region, translationsPath} = this.config
    return `https://${region}.console.aws.amazon.com/codesuite/codecommit/repositories/${url}/browse/refs/heads/${defaultBranch}/--${getBaseUrl(translationsPath)}/${lang}.json`
  }

  findSourceBranch(): string | Promise<string> {
    return this.config.sourceBranch
  }

  setAuthor(author: Author) {
    this.author = author
  }

  async getFileContent(fileName: string): Promise<string> {
    const filePath = `${getBaseUrl(this.config.translationsPath)}/${fileName}`
    const repositoryName = this.config.url
    const branchName = this.config.sourceBranch
    const {branch} = await this.client.getBranch({repositoryName, branchName})
    const fileData = await this.client.getFile({repositoryName, filePath, commitSpecifier: branch?.commitId})
    const data = await this.client.getBlob({repositoryName, blobId: fileData.blobId})

    return JSON.parse(new TextDecoder().decode(data.content as Uint8Array))
  }

  async saveFile(lang: string, dict: Dict, defaultDict: Dict, commitMessage: string) {
    const filePath = `${getBaseUrl(this.config.translationsPath)}/${lang}.json`
    const fileContent = LoadedProject.prettyFormat(rebuildDictInOrder(dict, defaultDict), this.config.indent)
    const repositoryName = this.config.url
    const branchName = this.config.branch

    const commitId = await this.getOrCreateTargetBranchCommitId()

    return this.client.putFile({
      repositoryName,
      branchName,
      fileContent: new TextEncoder().encode(fileContent),
      filePath,
      commitMessage,
      parentCommitId: commitId,
      name: this.author.name,
      email: this.author.email
    })
  }

  private async getOrCreateTargetBranchCommitId() {
    if (this.config.sourceBranch === this.config.branch) return

    const repositoryName = this.config.url
    const branchName = this.config.branch

    try {
      const {branch} = await this.client.getBranch({repositoryName, branchName})
      return branch?.commitId
    } catch (e) {
      const {branch} = await this.client.getBranch({repositoryName, branchName: this.config.sourceBranch})
      await this.client.createBranch({repositoryName, branchName, commitId: branch?.commitId!})
      return branch?.commitId
    }
  }
}