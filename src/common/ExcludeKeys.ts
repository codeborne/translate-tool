import jsonLoader from './JsonLoader'
import type {Project} from './Project'

class ExcludedKeys {
  private fileName = 'dont-translate-keys'

  public async fetch(project: Project) {
    let excludedKeys: string[]
    try {
      excludedKeys = await jsonLoader.loadFor(project, this.fileName) as string[]
    } catch (e) {
      excludedKeys = []
    }
    return excludedKeys ?? []
  }
}

export const excluded = new ExcludedKeys()