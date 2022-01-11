import {act, render} from '@testing-library/svelte'
import {expect} from 'chai'
import App from './App.svelte'
import {stub} from 'sinon'
import {tick} from 'svelte'

// TODO fix all of these tests and work out how to properly test multiple fetch requests
const loadedProject = {hello: 'world', nested: {hello: 'Another World'}}
const projects = [
  {
    title: 'TestTitle',
    url: 'TestUrl',
    indent: 2
  }]

describe('<App>', () => {
  it.skip('renders language importer with no config file or localstorage', async () => {
    stub(window, 'fetch').resolves({json: async () => undefined} as Response)
    const {container} = render(App)
    expect(fetch)
    await act(fetch)
    expect(container.querySelector('main')).to.exist
  })

  it.skip('renders editor if localStorage exists', async () => {
    localStorage.setItem('projects', JSON.stringify(projects))
    stub(window, 'fetch')
      .onFirstCall().resolves({json: async () => null} as Response)
      .onSecondCall().resolves({json: async () => loadedProject} as Response)
    const {container} = render(App)
    expect(fetch)
    await act(fetch)
    await act(fetch)
    await tick()
    expect(container.querySelector('#rawOutput')).to.exist
  })

  it.skip('renders editor if project deployment file exists', async () => {
    stub(window, 'fetch')
      .onFirstCall().resolves({json: async () => projects} as Response)
      .onSecondCall().resolves({json: async () => projects} as Response)
      .onSecondCall().resolves({json: async () => loadedProject} as Response)
    const {container} = render(App)
    expect(container.querySelector('main')).to.exist
    expect(fetch)
    await act(fetch)
    await act(fetch)
    await tick()
    expect(container.querySelector('#rawOutput')).to.exist
  })
})
