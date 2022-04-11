import jsonLoader from './JsonLoader'
import type {Project} from './Project'

class ExcludedKeysLoader {
  private fileName = 'dont-translate-keys'

  public async fetch(project: Project): Promise<Set<string>> {
    let excludedKeys: string[]
    try {
      excludedKeys = await jsonLoader.loadFor(project, this.fileName) as string[]
    } catch (e) {
      excludedKeys = []
    }
    console.log(excludedKeys)
    return new Set(excludedKeys)
  }
}

export const excludedKeysLoader = new ExcludedKeysLoader()
