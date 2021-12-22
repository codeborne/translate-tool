import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import ChangesCounter from './ChangesCounter.svelte'

describe('ChangesCounter', () => {

  const uneditedDict = {t1: '1', t2: '2', t: {t3: '3', t4: '4', t: {t5: '5', t6: '6'}}}
  const dict = {t1: 'new', t2: '2', t: {t3: '3', t4: '4', t: {t5: '', t6: 'new value'}}}

  it('renders', async () => {
    const {container, getByText} = render(ChangesCounter, {dict, uneditedDict})
    const e = getByText(/0/)
    expect(container).to.contain(e)
  })
})
