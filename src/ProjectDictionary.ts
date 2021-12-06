export interface ProjectDictionary {
  title: string
  dictionaries: ProjectDictionaryInfo[]
}

export interface ProjectDictionaryInfo {
  lang: string,
  dict: Record<string, any>
}

/*
[
  {
  title: "proj1"
  dictionaries: [
    {
      lang: "en",
      dict: {},
    {
      lang: "de",
      dict: {}
      ]
  },
  {
  title: "proj2"
  projects: [
    {
      lang: "et",
      dict: {
      app: "eeett"
    },
    {
      lang: "es",
      dict: {
      app: "me gusta"
    }]
  }
]
 */