import type {Dict, Project} from './Project'
import {LoadedProject} from './Project'
import {b64DecodeUnicode, getBaseUrl} from './utils'

class JsonLoader {
  request(url: string, init?: RequestInit) {
    return fetch(url, init).then(r => {
      if (!r.ok) throw new Error('Failed to load ' + url)
      else return r.json()
    })
  }

  loadJson(url: string, init?: RequestInit) {
    return this.request(url, init)
  }

  loadFor(project: Project, fileBaseName: string): Promise<any> {
    const url = getBaseUrl(project.url) + '/' + fileBaseName + '.json'
    return url.includes(gitHubHost) ?
      new GitHubClient(project).getFileContent(url) :
      this.loadJson(url)
  }

  async loadProject(project: Project): Promise<LoadedProject> {
    const langs = await this.loadFor(project, 'langs') as string[]
    const loadedDicts = await Promise.all(langs.map(lang => this.loadFor(project, lang)))
    const dicts = loadedDicts.reduce((r, dict, i) => {
      r[langs[i]] = dict; return r
    }, {} as Record<string, Dict>)
    return new LoadedProject(project, dicts)
  }
}

export const gitHubHost = 'api.github.com'

export class GitHubClient {
  constructor(public config: Project) {
    if (!config.url.includes(gitHubHost)) throw new Error('Not a GitHub url: ' + config.url)
  }
  branch = 'translations'

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

  getFileData(url: string, branch?: string) {
    return this.request(url + (branch ? '?ref=' + branch : '')) as Promise<GitHubFile>
  }

  async getFileContent(url: string) {
    const response = await this.getFileData(url)
    if (response.encoding === 'base64') return JSON.parse(b64DecodeUnicode(response.content))
    else response.content
  }

  async saveFile(lang: string, dict: Dict) {
    await this.createBranchIfNeeded()
    const fileUrl = this.config.url + lang + '.json'
    const content = btoa(JSON.stringify(dict, null, this.config.indent)) // TODO: move stringify logic to a common place
    const previousFileBlobSha = (await this.getFileData(fileUrl + '?ref=' + this.branch)).sha // TODO: store initial file sha in LoadedProject
    return await this.put(fileUrl, {
      message: `Updated ${lang} translations`,
      sha: previousFileBlobSha,
      branch: this.branch,
      content,
      author: {name: 'Translate Tool', email: 'translate@codeborne.com'}
    }) as GitHubSavedFile
  }

  private async createBranchIfNeeded() {
    const refsUrl = this.config.url.replace(/contents\/.*$/, 'git/refs')
    const refs = await this.request(refsUrl) as GitHubRef[]

    let branchSha = refs.find(r => r.ref == 'refs/heads/' + this.branch)?.object.sha
    if (!branchSha) {
      branchSha = refs[0].object.sha
      await this.post(refsUrl, {ref: 'refs/heads/' + this.branch, sha: branchSha})
      // TODO: create a PR here
    }
  }
}

interface GitHubFile {
  content: string,
  encoding: string,
  sha: string
}

interface GitHubSavedFile {
  content: {name: string, path: string, sha: string, html_url: string}
  commit: {sha: string, html_url: string}
}

interface GitHubRef {
  ref: string,
  url: string
  object: {
    type: string,
    sha: string,
    url: string
  }
}

const jsonLoader = new JsonLoader()
export default jsonLoader
