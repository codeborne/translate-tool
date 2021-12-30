import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import TextInput from './TextInput.svelte'
import type {Dict} from '../common/Project'

describe('TextInput', () => {

  const dict: Dict = {something: 'no html', somethingHtml: 'html', b: {c: 'c'}}
  let key = 'somethingHtml'
  let lang = 'en'

  it('renders element with contenteditable if given key that ends with Html', async () => {
    const {container} = render(TextInput, {uneditedDict:dict, dict, key, lang})
    const element = container.querySelector('[contenteditable]')
    expect(element).to.exist
    expect(element!.textContent).to.contain('html')
    element!.textContent = 'edited'
    expect(element!.textContent).to.contain('edited')
  })

  it('renders textarea if key does not end with Html', async () => {
    key = 'something'
    const {container} = render(TextInput, {uneditedDict:dict, dict, key, lang})
    const element = container.querySelector('textarea')
    expect(element).to.exist
    expect(element!.value).to.contain('html')
    element!.value = 'edited'
    expect(element!.value).to.contain('edited')
  })
})
