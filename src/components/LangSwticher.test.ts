import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import LangSwitcher from './LangSwitcher.svelte'

describe('<LangSwitcher>', () => {
  const langs = ['de', 'et', 'es', 'en', 'ru', 'se']
  const project = {title: 'project', indent: 2, url: '../../i18n/langs.json'}
  const lang = 'de'
  const selectedProjectTitle = 'project'

  it('renders list', () => {
    const {container} = render(LangSwitcher, {selectedProjectTitle,
      lang,
      langs,
      project,
      changed: true})
    expect(container.querySelector('select'))
  })

  it('renders list as defined by available languages', () => {
    const {container} = render(LangSwitcher, {selectedProjectTitle, lang: 'de', project, changed: true, langs})
    expect(container.querySelectorAll('select option')).to.have.length(6)
    expect(container.querySelector('select')!.value).contains('de')
    expect(container.querySelector('select')!.textContent).contains('EN')
  })
})