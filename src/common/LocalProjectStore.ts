import type {Project} from './Project'

class LocalProjectStore {

  public setProjects(projects: Project[]) {
    localStorage.setItem('projects', JSON.stringify(projects))
  }

  public getProjects(): Project[] {
    return JSON.parse(localStorage.getItem('projects') ?? '[]')
  }

  public setSelectedProject(project: Project) {
    localStorage.setItem('selectedProject', project.title)
  }

  public getSelectedProject() {
    return localStorage.getItem('selectedProject')
  }

  public setLang(lang: string) {
    localStorage.setItem('selectedLanguage', lang)
  }

  public getLang() {
    return localStorage.getItem('selectedLanguage')
  }
}

export default new LocalProjectStore()