import type {Dict, Project} from './Project'
import {GitHubClient} from '../github/GitHubClient'
import {BitBucketClient} from '../bitbucket/BitBucketClient'
import {ProjectSource} from './Project'
import {SimpleProjectClient} from '../simpleproject/SimpleProjectClient'

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
  findDefaultBranch(): Promise<string> | string
}

export function clientFor(config: Project): VersionControlClient {
  switch(config.source) {
    case ProjectSource.Github: return new GitHubClient(config)
    case ProjectSource.BitBucket: return new BitBucketClient(config)
    case ProjectSource.SimpleProject: return new SimpleProjectClient(config)
    default: throw Error('Unsupported project')
  }
}
