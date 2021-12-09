import type {Dict, Project} from './Project'
import {LoadedProject} from './Project'
import {getBaseUrl} from './utils'
import {GitHubClient} from '../github/GitHubClient'

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
    return url.includes(GitHubClient.host) ?
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

const jsonLoader = new JsonLoader()
export default jsonLoader
