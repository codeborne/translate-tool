import {act, render} from '@testing-library/svelte'
import {expect} from 'chai'
import App from './App.svelte'
import {stub} from 'sinon'
import {tick} from 'svelte'
import jsonLoader from './common/JsonLoader'

// TODO fix all of these tests and work out how to properly test multiple fetch requests
const loadedProject = {hello: 'world', nested: {hello: 'Another World'}}
const projects = [
  {
    title: 'TestTitle',
    url: 'TestUrl',
    indent: 2
  }]

describe('<App>', () => {
  it('renders language importer with no config file or localstorage', async () => {
    stub(jsonLoader, 'loadJson').resolves({json: async () => undefined} as Response)
    const {container} = render(App)
    expect(jsonLoader.loadJson).called
    await act(jsonLoader.loadJson)
    await tick()
    expect(container.querySelector('.addNew')).to.exist
  })

  it.skip('renders editor if localStorage exists, but no deployed projects', async () => {
    stub(window.localStorage, 'getItem').returns(JSON.stringify(projects))
    stub(jsonLoader, 'loadJson').resolves({json: async () => null} as Response)

    // @ts-ignore
    stub(jsonLoader, 'loadProject').returns(loadedProject)
    const {container} = render(App)

    expect(jsonLoader.loadJson).called
    await act(jsonLoader.loadJson)

    expect(window.localStorage.getItem).calledWith('projects')
    await act(window.localStorage.getItem)

    expect(jsonLoader.loadProject).called
    await act(jsonLoader.loadProject)

    await tick()
    expect(container.querySelector('#output')).to.exist
  })

  it.skip('renders editor if project file exists', async () => {
    // @ts-ignore
    stub(jsonLoader, 'loadJson').resolves({json: async () => projects} as Response)
    const {container} = render(App)
    expect(container.querySelector('main')).to.exist
    expect(jsonLoader.loadJson).calledWith('projects.json')
    await act(jsonLoader.loadJson)
    await tick()
    expect(container.querySelector('#output')).to.exist
  })
})
