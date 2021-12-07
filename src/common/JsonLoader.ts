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
  constructor(public config: Project) {}

  authHeader() {
    return this.config.token ? {Authorization: 'token ' + this.config.token} : undefined
  }

  request(url: string, init?: RequestInit) {
    return jsonLoader.request(url, {headers: {...this.authHeader(), ...init?.headers}, ...init})
  }

  post(url: string, body: any) {
    return this.request(url, {method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json', 'Accept': 'application/vnd.github.v3+json'}})
  }

  async getFileContent(url: string) {
    const response = await this.request(url) as GitHubFile
    if (response.encoding === 'base64') return JSON.parse(b64DecodeUnicode(response.content))
    else response.content
  }

  async saveProject(dict: Dict) {
    if (!this.config.url.includes(gitHubHost)) throw new Error('Saving unsupported for ' + this.config.url)

    const refsUrl = this.config.url.replace(/contents\/.*$/, 'git/refs')
    const refs = await this.request(refsUrl) as GitHubRef[]
    const masterSha = refs.find(r => r.ref == 'refs/heads/master')?.object.sha
    // TODO const translationsSha = refs.find(r => r.ref == 'refs/heads/master')?.object.sha

    return await this.post(refsUrl, {ref: 'refs/heads/translations', sha: masterSha}) as GitHubRef
  }
}

interface GitHubFile {
  content: string,
  encoding: string
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
