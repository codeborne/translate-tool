import { render } from '@testing-library/svelte'
import ChangesCounter from './ChangesCounter.svelte'
import { tick } from 'svelte'

describe('ChangesCounter', () => {
  const uneditedDict = { t: '1', t2: { t3: '3' } }

  it('shows number of changes', async () => {
    const { container, component } = render(ChangesCounter, { dict: uneditedDict, uneditedDict })
    expect(container.querySelector('.num-changes')).not.toBeInTheDocument()

    component.$set({ dict: { ...uneditedDict, t1: '2' } })
    await tick()
    expect(container.querySelector('.num-changes').textContent).toContain('1 change')

    component.$set({ dict: { t: '2', t2: { t3: '4' } } })
    await tick()
    expect(container.querySelector('.num-changes').textContent).toContain('2 changes')
  })
})
