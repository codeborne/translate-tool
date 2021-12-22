import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import ChangesCounter from './ChangesCounter.svelte'

describe('ChangesCounter', () => {
  const uneditedDict = {t1: '1', t2: '2', t: {t3: '3', t4: '4', t: {t5: '5', t6: '6'}}}
  let dict = uneditedDict
  it('Shows default value upon render', async () => {
    const {container, component} = render(ChangesCounter, {dict, uneditedDict})
    expect(container.querySelector('div span')!.textContent).to.contain('0')
  })

  it('Shows correct amount of different values if dictionaries are different', async () => {
    dict = {t1: 'new', t2: '2', t: {t3: '3', t4: '4', t: {t5: '', t6: 'new value'}}}
    const {container, component} = render(ChangesCounter, {dict, uneditedDict})
    expect(container.querySelector('div span')!.textContent).to.contain('3')
  })
})
