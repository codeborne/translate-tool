export interface ProjectDictionary {
  title: string
  dictionaries: ProjectDictionaryInfo[]
}

export interface ProjectDictionaryInfo {
  lang: string,
  dict: Record<string, any>
}