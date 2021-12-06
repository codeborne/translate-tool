import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import LangSwitcher from './LangSwitcher.svelte'
import type {LoadedProject} from '../Project'

describe('<LangSwitcher>', () => {
  const project = {dicts: {de: {}, et: {}, es: {}}} as Partial<LoadedProject>
  const lang = 'de'

  it('renders project languages', () => {
    const {container} = render(LangSwitcher, {project, lang})
    let select = container.querySelector('select')!
    expect(select).to.exist
    expect(select.options).to.have.length(3)
  })
})
