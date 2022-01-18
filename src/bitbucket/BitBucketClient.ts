import type {Dict, Project} from '../common/Project'
import jsonLoader from '../common/JsonLoader'

export class BitBucketClient {
  static host = 'api.bitbucket.org'
  branch = this.config.branch ?? 'translations'
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

  put(url: string, body: any) {
    return this.send(url, 'PUT', body)
  }

  async getAccessToken() {
    const split = this.config.token.split(':')
    const body = 'grant_type=client_credentials&client_id=' + split[0] + '&client_secret=' + split[1]
    return await this.post('https://bitbucket.org/site/oauth2/access_token', body) as BitBucketAuthResponse
  }


  async getFile(file: string, branch?: string) {
    const url = branch ? this.config.url.replace('/main/', `/${branch}/`) : this.config.url
    const token = (this.config.token) ? await this.getAccessToken() : undefined
    return await this.fetchFile(url + file, token?.access_token)
  }

  async fetchFile(url: string, token: string | undefined, init?: RequestInit,) {
    return await this.request(url, {...init, headers: {...this.tokenHeader(token), ...init?.headers}})
  }

  async saveFile(lang: string, dict: Dict, commitMessage: string) {
    const token: BitBucketAuthResponse = await this.getAccessToken()
    await this.createBranchIfNotExists(token.access_token)
  }

  async createBranchIfNotExists(token: string) {
    const branchExists: boolean = await this.checkIfBranchExists(token)
    if (branchExists) await this.createBranch()
  }

  async createBranch() {

  }

  async checkIfBranchExists(token: string): Promise<boolean> {
    const listBranchesUrl = this.config.url.slice(0, this.config.url.indexOf('/src/')) + '/refs/branches'
    console.log(listBranchesUrl)
    const branches = await fetch(listBranchesUrl,{
      method: 'GET',
      headers: {
        ...this.tokenHeader(token)
      }
    }).then(res => res.json()) as BitBucketBranchListResponse
    return !!(branches.values.find((branch) => branch.name === this.branch))
  }

}

export interface BitBucketAuthResponse {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  scopes: string,
  token_type: string
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
