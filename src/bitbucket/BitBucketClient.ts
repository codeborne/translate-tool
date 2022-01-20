import type {Dict, Project} from '../common/Project'
import {LoadedProject} from '../common/Project'
import jsonLoader from '../common/JsonLoader'
import {cleanEmptyKeys} from '../editor/cleanEmptyKeys'

export class BitBucketClient {
  static host = 'api.bitbucket.org'
  branch = this.config.branch ?? 'translations'
  author = {name: 'Translate Tool', email: 'translate@codeborne.com'}

  constructor(public config: Project) {
    if (!config.url.includes(BitBucketClient.host)) throw new Error('Not a BitBucket url: ' + config.url)
    if (config.branch) this.branch = config.branch ?? 'translations'
  }

  setAuthorName(name: string) {
    this.author.name = name
  }

  setAuthorEmail(email: string) {
    this.author.email = email
  }

  tokenHeader(token: string | undefined) {
    return token ? {Authorization: 'Bearer ' + token} : undefined
  }

  request(url: string, init?: RequestInit) {
    return jsonLoader.request(url, {...init, headers: {...init?.headers}})
  }

  send(url: string, method: string, body: any) {
    return this.request(url, {method, body, headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  }

  post(url: string, body: any) {
    return this.send(url, 'POST', body)
  }

  async getAccessToken() {
    const split = this.config.token!.split(':')
    const body = 'grant_type=client_credentials&client_id=' + split[0] + '&client_secret=' + split[1]
    return await this.post('https://bitbucket.org/site/oauth2/access_token', body) as BitBucketAuthResponse
  }

  getBranchListUrl() {
    return this.config.url.slice(0, this.config.url.indexOf('/src/')) + '/refs/branches'
  }

  getRootUrl() {
    return this.config.url.slice(0, this.config.url.indexOf('/src/'))
  }

  getDirectoryUrl() {
    return this.config.url.slice(this.config.url.indexOf(`/src/main/`) + 10, this.config.url.length)
  }

  findDefaultBranch() {
    const suffix = this.config.url.slice(this.config.url.indexOf(`/src/`) + 5, this.config.url.length)
    return suffix.slice(0, suffix.indexOf('/'))
  }

  getCommitsUrl() {
    return 'https://bitbucket.org'
      + this.config.url.slice(this.config.url.indexOf('/repositories/') + 13, this.config.url.indexOf('/src/'))
      + '/commits'
  }

  async getFile(file: string) {
    const url = this.config.url.replace('/main/', `/${this.branch}/`)
    const token = (this.config.token) ? await this.getAccessToken() : undefined
    return await this.fetchFile(url + file, token?.access_token)
      .catch(() => this.fetchFile(this.config.url + file, token?.access_token))
  }

  async getFileNoCatch(file: string, branch?: string) {
    const url = branch ? this.config.url.replace('/main/', `/${branch}/`) : this.config.url
    const token = (this.config.token) ? await this.getAccessToken() : undefined
    return await this.fetchFile(url + file, token?.access_token)
  }

  async fetchFile(url: string, token: string|undefined, init?: RequestInit,) {
    return await this.request(url, {...init, headers: {...this.tokenHeader(token), ...init?.headers}})
  }

  async saveFile(lang: string, dict: Dict, commitMessage: string) {
    const token: BitBucketAuthResponse = await this.getAccessToken()
    await this.createBranchIfNotExists(token.access_token)
    await this.commit(lang, dict, commitMessage, token.access_token)
    const hasPullRequest: boolean = await this.checkIfPullRequestExists(token?.access_token)
    if (!hasPullRequest) await this.createPullRequest("Updated translations", token?.access_token)
  }

  async commit(lang: string, dict: Dict, commitMessage: string, token: string) {
    const body = new FormData()
    body.append('message', commitMessage)
    body.append('branch', this.branch)
    body.append('author', `${this.author.name} <${this.author.email}>`)
    body.append(`${this.getDirectoryUrl()}${lang}.json`, LoadedProject.prettyFormat(cleanEmptyKeys(dict), this.config.indent))
    const headers = {...this.tokenHeader(token)}
    await this.request(`${this.getRootUrl()}/src`, {method: 'POST', body, headers})
  }

  async createPullRequest(title: string, token: string) {
    const body = JSON.stringify({title, source: {branch: {name: this.branch}}})
    const headers = {...this.tokenHeader(token), ...{'Content-Type': 'application/json'}}
    await this.request(`${this.getRootUrl()}/pullrequests`, {method: 'POST', body, headers})
  }

  async checkIfPullRequestExists(token: string|undefined): Promise<boolean> {
    const values: BitBucketPullsResponseValue[] =
      (await this.request(this.getRootUrl() + '/pullrequests',
        {headers: {...this.tokenHeader(token)}}) as BitBucketPullsResponse).values
    if (!values?.length) return false
    return !!values.find(value => value.source.branch.name === this.branch)
  }

  async createBranchIfNotExists(token: string) {
    const branchExists: boolean = await this.checkIfBranchExists(token)
    if (!branchExists) await this.createBranch(token)
  }

  async checkIfBranchExists(token: string): Promise<boolean> {
    const branches = await this.request(`${this.getBranchListUrl()}`,
      {headers: {...this.tokenHeader(token)}}) as BitBucketBranchListResponse
    return !!(branches.values.find((branch) => branch.name === this.branch))
  }

  async createBranch(token: string) {
    const body = JSON.stringify({name: this.branch, target: {hash: 'main'}})
    const headers = {...this.tokenHeader(token), ...{'Content-Type': 'application/json'}}
    await this.request(`${this.getBranchListUrl()}`, {method: 'POST', body, headers})
  }



}

export interface BitBucketAuthResponse {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  scopes: string,
  token_type: string
}

export interface BitBucketPullsResponse {
  state: string,
  values: BitBucketPullsResponseValue[]
}

export interface BitBucketPullsResponseValue {
  source: {
    branch: {
      name: string
    }
  }
}

export interface BitBucketBranchListResponse {
  values: BitBucketBranchValue[]
}

export interface BitBucketBranchValue {
  name: string,
  type: string,
  target: {
    hash: string
  }
}

