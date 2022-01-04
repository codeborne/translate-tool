import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import FilterControls from './FilterControls.svelte'
import Filter from './Filter'

describe('FilterControls', () => {

  let filter: Filter = new Filter('test', false)

  it('Shows correct filters on render', async () => {
    const {container} = render(FilterControls, {filter})
    expect(container.querySelector('.form-check-label')!.textContent).to.contain('Show only empty')
    expect((container.querySelector('.form-control') as HTMLInputElement).value).to.equal('test')
    expect((container.querySelector('.form-check-input') as HTMLInputElement).value).to.equal('on')
  })
})
