import type {Dict, Project} from '../common/Project'
import {LoadedProject} from '../common/Project'
import {encodeBase64Unicode} from '../common/utils'
import jsonLoader from '../common/JsonLoader'
import {rebuildDictInOrder} from '../editor/rebuildDictInOrder'
import type {Author, VersionControlClient} from '../common/VersionControlClient'

export class GitLabClient implements VersionControlClient {
  branch = 'translations'
  icon = 'fab fa-gitlab'
  label = 'GitLab'
  author: Author = {name: 'Translate Tool', email: 'translate@codeborne.com'}

  constructor(public config: Project) {
    if (config.branch) this.branch = config.branch
  }

  setAuthor(author: Author) {
    this.author = author
  }

  authHeader() {
    return this.config.token ? {'PRIVATE-TOKEN': this.config.token} : undefined
  }

  request(url: string, init?: RequestInit) {
    return jsonLoader.request(url, {...init, headers: {...this.authHeader(), ...init?.headers}})
  }

  send(url: string, method: string, body: any) {
    return this.request(url, {method, body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}})
  }

  put(url: string, body: any) {
    return this.send(url, 'PUT', body)
  }

  findSourceBranch(): Promise<string> | string {
    return this.branch
  }

  async getFileContent(file: string, branch?: string|undefined) {
    return jsonLoader.loadJson(this.config.url + encodeURIComponent(file) + '/raw' + (branch ? '?ref=' + branch : ''), {headers: this.authHeader()})
  }

  getSourceUrl(defaultBranch: string, lang: string): string {
    return ''
  }

  async saveFile(lang: string, dict: Dict, defaultDict: Dict, commitMessage: string) {
    const fileName = lang + '.json'
    const content = encodeBase64Unicode(LoadedProject.prettyFormat(rebuildDictInOrder(dict, defaultDict), this.config.indent))
    return await this.put(this.config.url + encodeURIComponent(fileName), {
      branch: this.branch,
      commit_message: commitMessage,
      author_name: this.author.name,
      author_email: this.author.email,
      encoding: 'base64',
      content
    }) as GitLabSavedFile
  }
}

export interface GitLabSavedFile {
  file_path: string
  branch: string
}
