import {act, render} from '@testing-library/svelte'
import {expect} from 'chai'
import LangEditor from './DictEditor.svelte'
import {stub} from 'sinon'
import type {Project} from '../common/Project'
import jsonLoader from '../common/JsonLoader'

describe('<LangEditor>', () => {
  const dict = {hello: 'world', nested: {hello: 'Another World'}}
  const selectedProjectTitle = 'testproject'
  const project: Project = {title: 'project', indent: 2, url: '../../i18n/langs.json', token: ''}

  it('renders spinner if loading', () => {
    stub(jsonLoader, 'load').returns(new Promise(() => {}))
    const {container} = render(LangEditor, {selectedProjectTitle, project})
    expect(container.querySelector('.spinner-border')).to.exist
  })

  it('renders fetched dictionary data correctly', async () => {
    stub(jsonLoader, 'load')
      .withArgs(project, 'langs').resolves(['en', 'et'])
      .withArgs(project, 'en').resolves(dict)
      .withArgs(project, 'et').resolves(dict)
    const {container} = render(LangEditor, {selectedProjectTitle, project})
    expect(jsonLoader.load).calledWith(project, 'langs')
    await act(() => Promise.resolve())
    expect(jsonLoader.load).calledWith(project, 'en')
    await act(() => Promise.resolve())
    await act(() => Promise.resolve())
    expect(container.querySelector('#rawOutput'))
      .property('value')
      .contains(JSON.stringify(dict, null, 2), 'correct raw output')
  })
})