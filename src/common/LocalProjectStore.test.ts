import localProjectStore from './LocalProjectStore'
import type { Project } from './Project'

describe('LocalProjectStore', () => {
  const project: Project = {
    indent: 2,
    title: 'Some Project',
    url: 'someurl'
  }

  beforeEach(() => {
    localStorage.clear()
  })

  it('sets and retrieves language', async () => {
    localProjectStore.setLang('en')
    expect(localProjectStore.getLang()).toEqual('en')
  })

  it('sets and retrieves selected project', async () => {
    localProjectStore.setSelectedProject(project)
    expect(localProjectStore.getSelectedProject()).toEqual('Some Project')
  })

  it('sets and retrieves project config', async () => {
    localProjectStore.setProjects([project])
    expect(localProjectStore.getProjects()).toEqual([project])
    expect(localProjectStore.getProjects()[0]).toEqual(project)
  })

  it('clears everything in localStorage', async () => {
    expect(localStorage.length).toEqual(0)
    localProjectStore.setLang('en')
    localProjectStore.setSelectedProject(project)
    expect(localStorage.length).toEqual(2)
    localProjectStore.clear()
    expect(localStorage.length).toEqual(0)
  })
})
