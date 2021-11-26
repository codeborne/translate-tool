import {act, render} from '@testing-library/svelte'
import {expect} from 'chai'
import LangEditor from './LangEditor.svelte'
import {stub} from 'sinon'

describe('<LangEditor>', () => {
  const dict = {hello: 'world', nested: {hello: 'Another World'}}
  const selectedProject = 'testproject'
  const project = {isPublic: true, title: 'project', langs: ['en', 'et'], indent: 2, defaultLang: 'en', url: '../../i18n/langs.json'}

  it('renders', () => {
    const {getByText} = render(LangEditor, {selectedProject, project})
    const e = getByText(/RAW output/i)
    expect(document.body.contains(e))
  })

  it('renders fetched dictionary data correctly', async () => {
    stub(window, 'fetch').resolves({json: () => Promise.resolve(dict)} as Response)
    const {getByText, container} = render(LangEditor, {selectedProject, project})
    expect(fetch)
    expect(fetch)
    await act(fetch)
    await act(fetch)
    expect(container.querySelector('#rawOutput'))
      .property('value')
      .contains(JSON.stringify(dict, null, 2), 'correct raw output')
  })
})