import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import LangSwitcher from './LangSwitcher.svelte'

describe('<LangSwitcher>', () => {
  const langs = ['en', 'et', 'es', 'de', 'ru', 'se']

  it('renders list', () => {
    const {container} = render(LangSwitcher, {lang: 'de', langs})
    expect(container.querySelector('select'))
  })

  it('renders list as defined by available languages', () => {
    const {container} = render(LangSwitcher, {lang: 'de', langs})
    expect(container.querySelectorAll('select option')).to.have.length(6)
    expect(container.querySelector('select')!.value).contains('de')
    expect(container.querySelector('select')!.textContent).contains('EN')
  })
})