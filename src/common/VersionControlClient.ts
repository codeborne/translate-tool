import type {AwsProject, Dict, Project} from './Project'
import {ProjectSource} from './Project'
import {GitHubClient} from '../github/GitHubClient'
import {BitBucketClient} from '../bitbucket/BitBucketClient'
import {SimpleProjectClient} from '../simpleproject/SimpleProjectClient'
import {AwsCodeCommitClient} from '../awscodecommit/AwsCodeCommitClient'

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
  saveFile(lang: string, dict: Dict, defaultDict: Dict, commitMessage: string): Promise<any>
  setAuthor(author: Author): void
  findSourceBranch(): Promise<string> | string
  getSourceUrl(defaultBranch: string, lang: string): string
}

export function clientFor(config: Project): VersionControlClient {
  switch(config.source) {
    case ProjectSource.Github: return new GitHubClient(config)
    case ProjectSource.BitBucket: return new BitBucketClient(config)
    case ProjectSource.SimpleProject: return new SimpleProjectClient(config)
    case ProjectSource.AwsCodeCommit: return new AwsCodeCommitClient(config as AwsProject)
    default: throw Error('Unsupported project')
  }
}
