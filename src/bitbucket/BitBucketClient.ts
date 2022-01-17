import type {Dict, Project} from '../common/Project'
import {LoadedProject} from '../common/Project'
import {decodeBase64Unicode, encodeBase64Unicode} from '../common/utils'
import jsonLoader from '../common/JsonLoader'
import {cleanEmptyKeys} from '../editor/cleanEmptyKeys'

export class BitBucketClient {
  static host = 'api.github.com'
  branch = 'translations'
  author = {name: 'Translate Tool', email: 'translate@codeborne.com'}
  constructor(public config: Project) {
    if (!config.url.includes(BitBucketClient.host)) throw new Error('Not a BitBucket url: ' + config.url)
    if (config.branch) this.branch = config.branch
  }

  setAuthorName(name: string) {
    this.author.name = name
  }

  setAuthorEmail(email: string) {
    this.author.email = email
  }

  authHeader() {
    return this.config.token ? {Authorization: 'token ' + this.config.token} : undefined
  }

  request(url: string, init?: RequestInit) {
    return jsonLoader.request(url, {...init, headers: {...this.authHeader(), ...init?.headers}})
  }

  send(url: string, method: string, body: any) {
    return this.request(url, {method, body: JSON.stringify(body), headers: {'Content-Type': 'application/json', 'Accept': 'application/vnd.github.v3+json'}})
  }

  post(url: string, body: any) {
    return this.send(url, 'POST', body)
  }

  put(url: string, body: any) {
    return this.send(url, 'PUT', body)
  }

  getFile(file: string, branch?: string) {
    return this.request(this.config.url + file + (branch ? '?ref=' + branch : '')) as Promise<BitBucketFile>
  }

  async getFileContent(file: string) {
    const response = await this.getFile(file, this.branch).catch(() => this.getFile(file))
    if (response.encoding === 'base64') return JSON.parse(decodeBase64Unicode(response.content))
    else response.content
  }

  async saveFile(lang: string, dict: Dict, commitMessage: string) {
    await this.createBranchIfNeeded()
    const fileName = lang + '.json'
    const content = encodeBase64Unicode(LoadedProject.prettyFormat(cleanEmptyKeys(dict), this.config.indent))
    const previousFileBlobSha = (await this.getFile(fileName + '?ref=' + this.branch)).sha
    return await this.put(this.config.url + fileName, {
      message: commitMessage,
      sha: previousFileBlobSha,
      branch: this.branch,
      content,
      author: this.author
    }) as BitBucketSavedFile
  }

  private async createBranchIfNeeded() {
    const refsUrl = this.config.url.replace(/contents\/.*$/, 'git/refs')
    const refs = await this.request(refsUrl) as BitBucketRef[]

    let branchSha = refs.find(r => r.ref == 'refs/heads/' + this.branch)?.object.sha
    if (!branchSha) {
      branchSha = refs[0].object.sha
      await this.post(refsUrl, {ref: 'refs/heads/' + this.branch, sha: branchSha})
    }
  }
}

export interface BitBucketFile {
  content: string,
  encoding: string,
  sha: string
}

export interface BitBucketSavedFile {
  content: {name: string, path: string, sha: string, html_url: string}
  commit: {sha: string, html_url: string}
}

export interface BitBucketRef {
  ref: string,
  url: string
  object: {
    type: string,
    sha: string,
    url: string
  }
}
