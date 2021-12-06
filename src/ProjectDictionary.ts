export interface ProjectDictionary {
  title: string
  dictionaries: Record<string, any>
}

/*
[
  {
  title: "proj1"
  dictionaries: [
    {
      lang: "en",
      dict: {
      app: "aaa"
    },
    {
      lang: "de",
      dict: {
      app: "bbb"
    }]
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