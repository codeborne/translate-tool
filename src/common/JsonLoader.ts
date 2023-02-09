import type {Dict, Project} from './Project'
import {LoadedProject} from './Project'
import {getBaseUrl} from './utils'
import {GitHubClient} from '../github/GitHubClient'
import {BitBucketClient} from '../bitbucket/BitBucketClient'
import {excludedKeysLoader} from './ExcludeKeysLoader'

interface GithubErrorResponse {
  message: string
}

interface BitbucketErrorResponse {
  type: string
  error: {
    message: string
  }
}

interface BitBucketAuthErrorResponse {
  error: string,
  error_description: string
}

type ErrorResponse = BitbucketErrorResponse & BitBucketAuthErrorResponse & GithubErrorResponse

class JsonLoader {
  request(url: string, init?: RequestInit) {
    return fetch(url, init).then(async (r) => {
      const defaultError = `Failed to load ${url}`
      let error: string|undefined
      if (!r.ok) {
        error = await r.json().then((msg: ErrorResponse) => {
          if (msg.message) return msg.message
          if (msg.type && msg.type == 'error') return msg.error.message
          if (msg.error_description) return msg.error_description
          throw new Error(defaultError)
        }).catch(() => defaultError)
        throw new Error(error)
      }
      return r.text()

    }).then((text) => {
      if (text.length) return JSON.parse(text)
    })
  }

  loadJson(url: string, init?: RequestInit) {
    return this.request(url, init)
  }

  loadFor(project: Project, fileBaseName: string, branch: string): Promise<any> {
    if (project.url.includes(GitHubClient.host)) return new GitHubClient(project).getFileContent(fileBaseName + '.json', branch)
    else if (project.url.includes(BitBucketClient.host)) return new BitBucketClient(project).getFileContent(fileBaseName + '.json')
    else return this.loadJson(getBaseUrl(project.url) + '/' + fileBaseName + '.json')
  }

  async loadProject(project: Project): Promise<LoadedProject> {
    try {
      let branch = project.branch ?? ''
      let langs: string[]
      try {
        langs = await this.loadFor(project, 'langs', branch)
      } catch (e) {
        branch = ''
        langs = await this.loadFor(project, 'langs', branch)
      }
      const loadedDicts = await Promise.all(langs!.map(lang => this.loadFor(project, lang, branch)))
      const dicts = loadedDicts.reduce((r, dict, i) => {
        r[langs[i]] = dict;
        return r
      }, {} as Record<string, Dict>)
      const excludedKeys = await excludedKeysLoader.fetch(project) ?? []
      return new LoadedProject(project, dicts, excludedKeys, {branchLoadedFrom: branch})
    } catch (e: any) {
      if ((e.message as string).includes('in JSON')) prompt('Possible broken JSON file - please validate them here:', 'https://codebeautify.org/jsonvalidator')
      console.error('Failed to load: ' + e)
      return new LoadedProject(project, {})
    }
}

  loadProjects(projects: Project[]) {
    return Promise.all(projects.map(p => this.loadProject(p)))
  }
}

const jsonLoader = new JsonLoader()
export default jsonLoader
