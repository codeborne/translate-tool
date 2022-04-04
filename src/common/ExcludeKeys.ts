import jsonLoader from './JsonLoader'
import type {Project} from './Project'
import {BitBucketClient} from '../bitbucket/BitBucketClient'
import {GitHubClient} from '../github/GitHubClient'

class ExcludeKeys {
  fileName = 'dont-translate-keys.json'

  async fetch(project: Project) {
    if (project.url.includes(BitBucketClient.host)) return await this.fetchBitBucket(project)
    else if (project.url.includes(GitHubClient.host)) return await this.fetchGithub(project)
    else return await this.fetchPublic(project.url)
  }

  async fetchPublic(url: string) {
    return await jsonLoader.loadJson(url + this.fileName) ?? []
  }

  fetchGithub(project: Project) {
    const client = new GitHubClient(project)
    return client.getFileContent(this.fileName) ?? []
  }

  fetchBitBucket(project: Project) {
    const client = new BitBucketClient(project)
    return client.getFileContent(this.fileName) ?? []
  }

}

export const excluded = new ExcludeKeys()