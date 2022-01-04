import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import ProjectAddButton from './ProjectAddButton.svelte'

describe('ProjectAddButton', () => {

  let showAddProject: boolean = true

  it('does not show button if true', async () => {
    const {container} = render(ProjectAddButton, {showAddProject})
    const button = container.querySelector('button') as HTMLButtonElement
    expect(button).to.not.exist
  })

  it('shows button if false', async () => {
    showAddProject = false
    const {container} = render(ProjectAddButton, {showAddProject})
    const button = container.querySelector('button') as HTMLButtonElement
    expect(button).to.exist
  })
})
