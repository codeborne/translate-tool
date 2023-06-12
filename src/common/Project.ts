export interface Project {
  title: string,
  url: string,
  indent: number,
  token?: string,
  branch?: string
  source: ProjectSource
}

export interface AwsProject extends Project {
  region: string
  branch: string
  sourceBranch: string
  accessKeyId: string
  secretAccessKey: string
  sessionToken: string
  translationsPath: string
}

export enum ProjectSource {
  BitBucket = 'BitBucket',
  Github = 'Github',
  SimpleProject = 'SimpleProject',
  AwsCodeCommit = 'AwsCodeCommit'
}

export interface ProjectMeta {
  branchLoadedFrom?: string
  errors?: string
}

export type Dict = Record<string, any | string>

export class LoadedProject {
  constructor(
    public config: Project,
    public dicts: Record<string, Dict>,
    public excluded: Set<string> = new Set(),
    public meta: ProjectMeta = {}
  ) {}

  get title() {
    return this.config.title
  }

  get langs() {
    return Object.keys(this.dicts)
  }

  // TODO: should not be static
  public static prettyFormat(dict: Dict, indent: number): string {
    return JSON.stringify(dict, null, indent)
  }

  public prettyFormat(dict: Dict): string {
    return LoadedProject.prettyFormat(dict, this.config.indent)
  }
}
