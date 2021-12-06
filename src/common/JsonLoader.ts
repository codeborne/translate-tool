import type {Dict, Project} from './Project'
import {LoadedProject} from './Project'
import {b64DecodeUnicode, getBaseUrl} from './utils'

class JsonLoader {
  loadJson(url: string, init?: RequestInit) {
    return fetch(url, init).then(r => {
      if (!r.ok) throw new Error('Failed to load ' + url)
      else return r.json()
    })
  }

  async loadFor(project: Project, fileBaseName: string): Promise<any> {
    const headers = project.token ? {Authorization: 'token ' + project.token} : undefined
    const response = await this.loadJson(getBaseUrl(project.url) + '/' + fileBaseName + '.json', {headers})
    if (response.content && response.encoding === 'base64') return JSON.parse(b64DecodeUnicode(response.content))
    else return response
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

export default new JsonLoader()
