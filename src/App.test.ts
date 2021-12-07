import {act, render} from '@testing-library/svelte'
import {expect} from 'chai'
import App from './App.svelte'
import {stub} from 'sinon'

describe('<App>', () => {
  it('renders language importer with no config file or localstorage', async () => {
    stub(window, 'fetch').resolves({json: async () => null} as Response)
    const {container} = render(App)
    expect(fetch)
    await act(fetch)
    await act(fetch)
    expect(container.querySelector('nav')).to.exist
    expect(container.querySelector('main')).to.exist
    expect(container.querySelector('.outline')).to.exist
    expect(container.querySelector('#addPrivate')).to.exist
    expect(container.querySelector('#addPublic')).to.exist
  })

  it('renders editor if localStorage exists', async () => {
    const projects = `[
      {
        "title": "Test",
        "url": "Test",
        "indent": 2
      },
      {
        "title": "Test",
        "url": "Test",
        "indent": 2
      }]`
    localStorage.setItem('projects', projects)

    stub(window, 'fetch').resolves({json: async () => null} as Response)
    const {container} = render(App)
    expect(fetch)
    await act(fetch)
    await act(fetch)
    expect(container.querySelector('nav')).to.exist
    expect(container.querySelector('main')).to.exist
    expect(container.querySelector('nav #backToImporterBtn')).to.exist
    !expect(container.querySelector('nav #backToEditorBtn')).to.not.exist
  })

  it('renders editor if project deployment file exists', async () => {
    const projects = [
      {
        "title": "Test",
        "url": "Test",
        "indent": 2
      },
      {
        "title": "Test",
        "url": "Test",
        "indent": 2
      }]

    stub(window, 'fetch').resolves({json: async () => projects} as Response)
    const {container} = render(App)
    expect(fetch)
    await act(fetch)
    await act(fetch)
    expect(container.querySelector('nav')).to.exist
    expect(container.querySelector('main')).to.exist
    expect(container.querySelector('nav #backToImporterBtn')).to.exist
    !expect(container.querySelector('nav #backToEditorBtn')).to.not.exist
  })
})
