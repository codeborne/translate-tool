import {act, render} from '@testing-library/svelte'
import {expect} from 'chai'
import App from './App.svelte'
import {SinonStub, stub} from 'sinon'
import {tick} from 'svelte'
import jsonLoader from './common/JsonLoader'
import type {Project} from './common/Project'
import {LoadedProject, ProjectSource} from './common/Project'
import localProjectStore from './common/LocalProjectStore'

const project: Project = {
  title: 'TestTitle',
  url: 'TestUrl',
  indent: 2,
  source: ProjectSource.SimpleProject
}

const loadedProject = new LoadedProject(project, {en: {hello: 'world', world: 'hello'}})

describe('<App>', () => {
  let loadJson: SinonStub

  beforeEach(() => {
    loadJson = stub(jsonLoader, 'loadJson').resolves(undefined)
    stub(jsonLoader, 'loadProjects').resolves([loadedProject])
    localProjectStore.clear()
  })

  it('renders importer with no config file nor localstorage', async () => {
    stub(localProjectStore, 'getProjects').returns([])
    const {container} = render(App)
    expect(jsonLoader.loadJson).calledWith('projects.json')
    await act(jsonLoader.loadJson)
    expect(localProjectStore.getProjects).called
    await tick()
    await tick()
    expect(container.querySelector('.import')).to.exist
  })

  it.skip('renders editor if localStorage exists, but no deployed projects', async () => {
    stub(localProjectStore, 'getProjects').returns([project])
    localProjectStore.setProjects([project])
    const {container} = render(App)
    await act(jsonLoader.loadJson)
    expect(localProjectStore.getProjects).called

    expect(jsonLoader.loadProjects).calledWith([project])
    await act(jsonLoader.loadProjects)

    await tick()
    expect(container.querySelector('#output')).to.exist
  })

  it.skip('renders editor if project file exists', async () => {
    loadJson.withArgs('projects.json').resolves([project])
    const {container} = render(App)
    expect(container.querySelector('main')).to.exist

    expect(jsonLoader.loadJson).calledWith('projects.json')
    await act(jsonLoader.loadJson)

    expect(jsonLoader.loadProjects).calledWith([project])
    await act(jsonLoader.loadProjects)
    expect(container.querySelector('#output')).to.exist
  })
})
