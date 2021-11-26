import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import LangSwitcher from './LangSwitcher.svelte'

describe('<LangSwitcher>', () => {
  const project = {langs:['de', 'et', 'es', 'en', 'ru', 'se'], title:'project', defaultLang: 'de'}
  const selectedProject = 'project'

  it('renders list', () => {
    const {container} = render(LangSwitcher, {selectedProject, lang: 'de', project, changed: true})
    expect(container.querySelector('select'))
  })

  it('renders list as defined by available languages', () => {
    const {container} = render(LangSwitcher, {selectedProject, lang: 'de', project, changed: true})
    expect(container.querySelectorAll('select option')).to.have.length(6)
    expect(container.querySelector('select')!.value).contains('de')
    expect(container.querySelector('select')!.textContent).contains('EN')
  })
})