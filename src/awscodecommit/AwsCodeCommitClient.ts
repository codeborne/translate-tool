import type {Author, VersionControlClient} from '../common/VersionControlClient'
import type {AwsProject, Dict} from '../common/Project'
import {LoadedProject} from '../common/Project'
import {rebuildDictInOrder} from '../editor/rebuildDictInOrder'
import {getBaseUrl} from '../common/utils'
import AWS from 'aws-sdk'

export class AwsCodeCommitClient implements VersionControlClient {
  branch = 'translations'
  icon = 'fab fa-amazon'
  label = 'AWS CodeCommit'
  author: Author = {name: 'Translate Tool', email: 'translate@codeborne.com'}
  client: AWS.CodeCommit

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

    this.client = new AWS.CodeCommit(credentials)
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
    const {branch} = await this.client.getBranch({repositoryName, branchName,}).promise()
    const fileData = await this.client.getFile({repositoryName, filePath, commitSpecifier: branch?.commitId}).promise()
    const data = await this.client.getBlob({repositoryName, blobId: fileData.blobId}).promise()

    return JSON.parse(new TextDecoder().decode(data.content as Uint8Array))
  }

  async saveFile(lang: string, dict: Dict, defaultDict: Dict, commitMessage: string) {
    const filePath = `${getBaseUrl(this.config.translationsPath)}/${lang}.json`
    const fileContent = LoadedProject.prettyFormat(rebuildDictInOrder(dict, defaultDict), this.config.indent)
    const repositoryName = this.config.url
    const branchName = this.config.branch

    const {branch} = await this.client.getBranch({repositoryName, branchName}).promise()

    return this.client.putFile({
      repositoryName,
      branchName,
      fileContent,
      filePath,
      commitMessage,
      parentCommitId: branch?.commitId,
      name: this.author.name,
      email: this.author.email
    }).promise()
  }
}