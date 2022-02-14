import {act, render} from '@testing-library/svelte'
import {expect} from 'chai'
import App from './App.svelte'
import {SinonStub, stub} from 'sinon'
import {tick} from 'svelte'
import jsonLoader from './common/JsonLoader'
import type {Project} from './common/Project'
import {LoadedProject} from './common/Project'

const project = {
  title: 'TestTitle',
  url: 'TestUrl',
  indent: 2
} as Project

const loadedProject = new LoadedProject(project, {en: {hello: 'world', world: 'hello'}})

describe('<App>', () => {
  let loadJson: SinonStub

  beforeEach(() => {
    loadJson = stub(jsonLoader, 'loadJson').resolves(undefined)
    stub(jsonLoader, 'loadProjects').resolves([loadedProject])
    localStorage.clear()
  })

  it('renders language importer with no config file or localstorage', async () => {
    const {container} = render(App)
    expect(jsonLoader.loadJson).calledWith('projects.json')
    await act(jsonLoader.loadJson)
    await tick()
    expect(container.querySelector('.addNew')).to.exist
  })

  it('renders editor if localStorage exists, but no deployed projects', async () => {
    localStorage['projects'] = JSON.stringify([project])
    const {container} = render(App)
    await act(jsonLoader.loadJson)

    expect(jsonLoader.loadProjects).calledWith([project])
    await act(jsonLoader.loadProjects)

    await tick()
    expect(container.querySelector('#output')).to.exist
  })

  it('renders editor if project file exists', async () => {
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
