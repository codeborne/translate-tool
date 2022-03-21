import type {Project} from './Project'

class LocalProjectStore {
  public _projects?: Project[] = []
  public _selectedProject?: Project
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
    const existingProject: Project|undefined = this._projects?.find((p) => p.title === title)
    if (existingProject) this._selectedProject = existingProject
  }
}

const localProjectStore = new LocalProjectStore()
export default  localProjectStore