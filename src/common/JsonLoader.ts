import type {Dict, Project} from './Project'
import {LoadedProject} from './Project'
import {getBaseUrl} from './utils'
import {GitHubClient} from '../github/GitHubClient'
import {BitBucketClient} from '../bitbucket/BitBucketClient'

class JsonLoader {
  request(url: string, init?: RequestInit) {
    return fetch(url, init).then(r => {
      if (!r.ok) throw new Error('Failed to load ' + url)
      return r.text()
    }).then((text) => {
      if(text.length) return JSON.parse(text)
    })
  }

  loadJson(url: string, init?: RequestInit) {
    return this.request(url, init)
  }

  loadFor(project: Project, fileBaseName: string): Promise<any> {
    if (project.url.includes(GitHubClient.host)) return new GitHubClient(project).getFileContent(fileBaseName + '.json')
    else if (project.url.includes(BitBucketClient.host)) return new BitBucketClient(project).getFileContent(fileBaseName + '.json')
    else return this.loadJson(getBaseUrl(project.url) + '/' + fileBaseName + '.json')
  }

  async loadProject(project: Project): Promise<LoadedProject> {
    const langs = await this.loadFor(project, 'langs') as string[]
    const loadedDicts = await Promise.all(langs.map(lang => this.loadFor(project, lang)))
    const dicts = loadedDicts.reduce((r, dict, i) => {
      r[langs[i]] = dict; return r
    }, {} as Record<string, Dict>)
    return new LoadedProject(project, dicts)
  }

  loadProjects(projects: Project[]) {
    return Promise.all(projects.map(p => this.loadProject(p)))
  }
}

const jsonLoader = new JsonLoader()
export default jsonLoader
