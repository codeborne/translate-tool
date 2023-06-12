import type {Author, VersionControlClient} from '../common/VersionControlClient'
import type {Dict} from '../common/Project'
import jsonLoader from '../common/JsonLoader'
import type {Project} from '../common/Project'
import {getBaseUrl} from '../common/utils'

export class SimpleProjectClient implements VersionControlClient {
  branch = 'translations'
  icon = ''
  label = 'Simple Project'
  author: Author = {name: 'Translate Tool', email: 'translate@codeborne.com'}

  constructor(public config: Project) {
  }

  getFileContent(file: string): any {
    return jsonLoader.loadJson(`${getBaseUrl(this.config.url)}/${file}`)
  }

  saveFile(lang: string, dict: Dict, defaultDict: Dict, commitMessage: string): any {
    throw Error("Not implemented")
  }

  setAuthor(author: Author): void {
    throw Error("Not implemented")
  }

  findSourceBranch(): Promise<string> {
    throw Error("Not implemented")
  }

  getSourceUrl(defaultBranch: string, lang: string): string {
    return `${this.config.url}${lang}.json`
  }
}