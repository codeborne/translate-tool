import type {Project} from './Project'

class LocalProjectStore {
  public projects: Project[] = []
  public selectedProject?: Project|undefined

  constructor() {
    this.init()
  }

  public init() {
    this.loadProjects()
    this.loadSelectedProject()
  }

  public add(project: Project) {
    this.projects?.push(project)
    localStorage.setItem('projects', JSON.stringify(this.projects))
  }

  public remove(title: string) {
    this.projects = this.projects?.filter(p => p.title !== title)
    if (title == this.selectedProject?.title) this.setSelectedProject(this.projects[0])
  }

  public setProjects(projects: Project[]) {
    this.projects = projects
    localStorage.setItem('projects', JSON.stringify(projects))
  }

  public setSelectedProject(project: Project) {
    this.selectedProject = project
    localStorage.setItem('selectedProject', project.title)
  }

  private loadProjects() {
    this.projects = JSON.parse(localStorage.getItem('projects') ?? '[]')
  }

  private loadSelectedProject() {
    const title = localStorage.getItem('selectedProject')
    const projectExists: Project|undefined = this.projects?.find((p) => p.title === title)
    if (projectExists) this.selectedProject = projectExists
    else this.selectedProject = this.projects?.length ? this.projects[0] : undefined
  }
}

const localProjectStore = new LocalProjectStore()
export default localProjectStore