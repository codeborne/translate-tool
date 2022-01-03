import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import FilterControls from './FilterControls.svelte'

describe('FilterControls', () => {
  it('renders', async () => {
    const {container} = render(FilterControls)
    expect(container.textContent).to.contain('TODO')
  })
})
