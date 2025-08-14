import type {AwsProject, Dict, Project} from './Project'
import {ProjectSource} from './Project'
import {GitHubClient} from '../github/GitHubClient'
import {BitBucketClient} from '../bitbucket/BitBucketClient'
import {SimpleProjectClient} from '../simpleproject/SimpleProjectClient'
import {AwsCodeCommitClient} from '../awscodecommit/AwsCodeCommitClient'
import {GitLabClient} from '../gitlab/GitLabClient'

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
    case ProjectSource.Gitlab: return new GitLabClient(config)
    case ProjectSource.SimpleProject: return new SimpleProjectClient(config)
    case ProjectSource.AwsCodeCommit: return new AwsCodeCommitClient(config as AwsProject)
    default: return legacyClientFor(config)
  }
}

function legacyClientFor(config: Project): VersionControlClient {
  if (config.url.includes(GitHubClient.host)) return new GitHubClient(config)
  else if (config.url.includes(BitBucketClient.host)) return new BitBucketClient(config)
  else throw Error('Unsupported project')
}

