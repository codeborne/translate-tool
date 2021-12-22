import {fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import DictKeyAdder from './DictKeyAdder.svelte'
import {fake, stub} from 'sinon'
import type {Dict} from '../common/Project'

describe('DictKeyAdder', () => {
  const keyPrefix = 'aaa.bbb'
  const key = 'bbb'
  let dict: Dict = {aaa: {bbb: {ccc: 'cc'}, bb: 'bb'}}

  async function clickPlusButton(promptResult: string|null) {
    const {container} = render(DictKeyAdder, {dict, keyPrefix, key})
    const button = container.querySelector('button')!
    stub(window, 'prompt').returns(promptResult)
    const onChange = fake()
    button.addEventListener('change', onChange)
    await fireEvent.click(button)
    return onChange
  }

  it('user can cancel', async () => {
    const onChange = await clickPlusButton(null)
    expect(prompt).called
    expect(onChange).not.called
  })

  it('user can create a new key', async () => {
    const onChange = await clickPlusButton('new')
    expect(prompt).calledWith('New key: aaa.bbb.')
    expect(dict['new']).to.eq('')
    expect(onChange).called
  })
})
