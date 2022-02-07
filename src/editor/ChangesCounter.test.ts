import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import ChangesCounter from './ChangesCounter.svelte'
import {tick} from 'svelte'

describe('ChangesCounter', () => {
  const uneditedDict = {t: '1', t2: {t3: '3'}}

  it('shows number of changes', async () => {
    const {container, component} = render(ChangesCounter, {dict: uneditedDict, uneditedDict})
    const numChanges = container.querySelector('.num-changes') as HTMLElement
    expect(numChanges.classList.contains('d-md-none')).to.be.true
    expect(numChanges.textContent).to.contain('0 changes')

    component.$$set!({dict: {...uneditedDict, t1: '2'}})
    await tick()
    expect(numChanges.classList.contains('d-md-none')).to.be.false
    expect(numChanges.textContent).to.contain('1 change')

    component.$$set!({dict: {t: '2', t2: {t3: '4'}}})
    await tick()
    expect(numChanges.textContent).to.contain('2 changes')
  })
})
