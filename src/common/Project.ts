export interface Project {
  title: string,
  url: string,
  token: string,
  indent: number
}

export type Dict = Record<string, object | string>

export interface LoadedProject extends Project {
  dicts: Record<string, Dict>
}
