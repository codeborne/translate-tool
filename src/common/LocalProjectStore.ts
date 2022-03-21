import type {Project} from './Project'

class LocalProjectStore {
  public _projects?: Project[] = []
  public _selectedProject?: Project|undefined
  constructor() {
    this.init()
  }

  private init() {
    this.loadProjectsFromLocalStorage()
    this.loadSelectedProject()
  }

  public set projects(projects: Project[]) {
    this._projects = projects
    localStorage.setItem('projects', JSON.stringify(projects))
  }

  public set selectedProject(project: Project) {
    this._selectedProject = project
    localStorage.setItem('selectedProject', project.title)
  }

  private loadProjectsFromLocalStorage() {
    this._projects = JSON.parse(localStorage.getItem('projects') ?? '[]')
  }

  private loadSelectedProject() {
    const title = localStorage.getItem('selectedProject')
    const projectExists: Project|undefined = this._projects?.find((p) => p.title === title)
    if (projectExists) this._selectedProject = projectExists
    else this._selectedProject = this._projects?.length ? this._projects[0] : undefined
  }
}

const localProjectStore = new LocalProjectStore()
export default  localProjectStore