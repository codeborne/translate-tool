import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import ToggleBackButton from './ToggleBackButton.svelte'

describe('ToggleBackButton', () => {
  let showConfig = true
  let showAddProject = false
  let showBack = true
  it('renders', async () => {
    const {container} = render(ToggleBackButton, {showConfig, showAddProject, showBack})
    expect(container.querySelector('.backBtn')).to.exist
  })

  it('does not render', async () => {
    showBack = false
    const {container} = render(ToggleBackButton, {showConfig, showAddProject, showBack})
    expect(container.querySelector('.backBtn')).to.not.exist
  })
})
