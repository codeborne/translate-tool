import type {Dict, Project} from './Project'
import {GitHubClient} from '../github/GitHubClient'
import {BitBucketClient} from '../bitbucket/BitBucketClient'

export interface Author {
  email: string
  name: string
}

export interface VersionControlClient {
  branch: string
  icon: string
  label: string
  author: Author

  getFileContent(file: string, branch: string): any
  saveFile(lang: string, dict: Dict, defaultDict: Dict, commitMessage: string): any
  setAuthor(author: Author): void
}

export function clientFor(config: Project): VersionControlClient {
  if (config.url.includes(GitHubClient.host)) return new GitHubClient(config)
  else if (config.url.includes(BitBucketClient.host)) return new BitBucketClient(config)
  else throw Error('Unsupported project')
}
