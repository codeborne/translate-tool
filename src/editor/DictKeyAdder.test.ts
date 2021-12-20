import {fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import DictKeyAdder from './DictKeyAdder.svelte'
import {fake, stub} from 'sinon'
import type {Dict} from '../common/Project'

describe('DictKeyAdder', () => {
  const keyPrefix = 'aaa.bbb'
  let dict: Dict = {aaa: {bbb: {ccc: 'cc'}, bb: 'bb'}}

  it('user can cancel', async () => {
    const {container} = render(DictKeyAdder, {dict, keyPrefix})
    const button = container.querySelector('button')!
    stub(window, 'prompt').returns(null)
    const onChange = fake()
    button.addEventListener('change', onChange)
    await fireEvent.click(button)
    expect(prompt).called
    expect(onChange).not.called
  })

  it('user can create a new key', async () => {
    const {container} = render(DictKeyAdder, {dict, keyPrefix})
    stub(window, 'prompt').returns('new')
    const button = container.querySelector('button')!
    const onChange = fake()
    button.addEventListener('change', onChange)
    await fireEvent.click(button)
    expect(prompt).calledWith('New key: aaa.bbb.')
    expect(dict['new']).to.eq('')
    expect(onChange).called
  })
})
