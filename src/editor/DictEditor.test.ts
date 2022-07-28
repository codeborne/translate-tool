import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import DictEditor from './DictEditor.svelte'
import type {Dict, Project} from '../common/Project'
import {LoadedProject} from '../common/Project'

describe('<DictEditor>', () => {

  const dict: Dict = {hello: 'world', nested: {hello: 'Another World'}}
  const lang = 'en'
  const user = undefined
  const config: Project = {title: 'project', indent: 2, url: '../../i18n/langs.json', token: ''}
  const project: LoadedProject = new LoadedProject(config, dict)

  it.skip('renders fetched dictionary data correctly', async () => {
    const {container} = render(DictEditor, {lang, project, user})
    expect(container.querySelector('#rawOutput')).to.exist
  })
  // TODO it now freezes due to refactoring
  // TODO redo the test entirely, eg check how many rows there are and pass the below code
  // expect(container.querySelector('#rawOutput'))
  //   .property('value')
  //   .contains(JSON.stringify(dict, null, 2))
})