export interface VersionControlClient {
  // static host: string TODO Is defining static properties in TS possible?
  branch: string
  icon: string
  label: string
  author: {
    name: string
    email: string
  }

  setAuthorEmail: (email: string) => void
  setAuthorName: (name: string) => void
}