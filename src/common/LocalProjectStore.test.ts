import {expect} from 'chai'
import localProjectStore from './LocalProjectStore'
import type {Project} from './Project'

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
    expect(localProjectStore.getLang()).to.equal('en')
  })

  it('sets and retrieves selected project', async () => {
    localProjectStore.setSelectedProject(project)
    expect(localProjectStore.getSelectedProject()).to.equal('Some Project')
  })

  it('sets and retrieves project config', async () => {
    localProjectStore.setProjects([project])
    expect(localProjectStore.getProjects()).to.deep.equal([project])
    expect(localProjectStore.getProjects()[0]).to.deep.equal(project)
  })

  it('clears everything in localStorage', async () => {
    expect(localStorage.length).to.equal(0)
    localProjectStore.setLang('en')
    localProjectStore.setSelectedProject(project)
    expect(localStorage.length).to.equal(2)
    localProjectStore.clear()
    expect(localStorage.length).to.equal(0)
  })
})
