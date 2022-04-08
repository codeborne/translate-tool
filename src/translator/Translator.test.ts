import {fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import Translator from './Translator.svelte'
import type {Dict} from '../common/Project'
import {stub} from 'sinon'
import translator from './Translator'

describe('Translator', () => {

  let lang = 'de'
  let defaultLang = 'en'
  let dict: Dict = {text: ''}
  let defaultDict: Dict = {text: 'some text'}
  let uneditedDict: Dict = {text: ''}
  let key = 'text'


  it('shows translation button by default', async () => {
    const {container} = render(Translator, {lang, defaultDict, dict, defaultLang, uneditedDict, key})
    expect(container.querySelector('.translate')).to.exist
  })

  it('returns translation on click', async () => {
    const {container} = render(Translator, {lang, defaultDict, dict, defaultLang, uneditedDict, key})
    stub(translator, 'translate').resolves('some text, but in german')
    const button = container.querySelector('.translate')!
    await fireEvent.click(button)
    expect(translator.translate).called
  })
})
