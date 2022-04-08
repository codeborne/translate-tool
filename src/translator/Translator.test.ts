import {fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import Translator from './Translator.svelte'
import type {Dict} from '../common/Project'
import {stub} from 'sinon'
import googleTranslate from './GoogleTranslate'

describe('Translator', () => {
  const lang = 'de'
  const defaultLang = 'en'
  const dict: Dict = {text: ''}
  const defaultDict: Dict = {text: 'some text'}
  const uneditedDict: Dict = {text: ''}
  const key = 'text'

  it('shows translation button by default', async () => {
    const {container} = render(Translator, {lang, defaultDict, dict, defaultLang, uneditedDict, key})
    expect(container.querySelector('.translate')).to.exist
  })

  it('returns translation on click', async () => {
    const {container} = render(Translator, {lang, defaultDict, dict, defaultLang, uneditedDict, key})
    stub(googleTranslate, 'translate').resolves('some text, but in german')
    const button = container.querySelector('.translate')!
    await fireEvent.click(button)
    expect(googleTranslate.translate).called
  })
})
