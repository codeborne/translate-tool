import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import DictClipboardOutput from './DictClipboardOutput.svelte'
import type {Dict} from '../common/Project'

describe('DictClipboardOutput', () => {

  const dict: Dict = {t1: 't1', t2: 't2', t3: 't3', t4: {}}
  const lang: string = 'en'
  const indent: number = 2

  it('renders', async () => {
    const {container} = render(DictClipboardOutput)
    expect(container.textContent).to.contain('TODO')
  })
})
