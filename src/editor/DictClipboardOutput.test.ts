import {fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import DictClipboardOutput from './DictClipboardOutput.svelte'
import type {Dict} from '../common/Project'
import {stub} from 'sinon'
import {tick} from 'svelte'

describe('DictClipboardOutput', () => {

  const dict: Dict = {t1: 't1', t2: 't2', t3: 't3', t4: {}}
  const lang: string = 'en'
  const indent: number = 2

  it('shows textarea with no empty keys', async () => {
    const {container} = render(DictClipboardOutput, {dict, lang, indent})
    expect(container.querySelector('textarea')!.value).to.contain('{\n  "t1": "t1",\n  "t2": "t2",\n  "t3": "t3"\n}')
  })

  it('clicking copy copies to clipboard', async () => {
    const {container} = render(DictClipboardOutput, {dict, lang, indent})
    const buttonElement = container.querySelector('button') as HTMLButtonElement
    expect(buttonElement).to.exist
    let copy = stub(document, 'execCommand')
    await fireEvent.click(buttonElement)
    await tick()
    expect(copy).called
  })
})
