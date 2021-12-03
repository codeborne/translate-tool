import type {Project} from './Project'
import {b64DecodeUnicode, getBaseUrl} from './utils'

class JsonLoader {
  loadJson(url: string, init?: RequestInit) {
    return fetch(url, init).then(r => {
      if (!r.ok) throw new Error('Failed to load ' + url)
      else return r.json()
    })
  }

  async load(project: Project, fileBaseName: string): Promise<any> {
    const headers = project.token ? {Authorization: 'token ' + project.token} : undefined
    const response = await this.loadJson(getBaseUrl(project.url) + '/' + fileBaseName + '.json', {headers})
    if (response.content && response.encoding === 'base64') return JSON.parse(b64DecodeUnicode(response.content))
    else return response
  }
}

export default new JsonLoader()
