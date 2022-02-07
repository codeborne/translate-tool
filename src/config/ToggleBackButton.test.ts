import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import ToggleBackButton from './ToggleBackButton.svelte'

describe('ToggleBackButton', () => {
  let showConfig = true
  let showAddProject = false
  it('renders', async () => {
    const {container} = render(ToggleBackButton, {showConfig, showAddProject})
    expect(container.querySelector('.backBtn')).to.exist
  })
})
