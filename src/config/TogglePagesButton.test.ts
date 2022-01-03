import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import TogglePagesButton from './TogglePagesButton.svelte'

describe('TogglePagesButton', () => {

  let showConfig: boolean = true
  let showAddProject: boolean = false
  let showBack: boolean = true

  it('renders back button if config open', async () => {
    const {container} = render(TogglePagesButton, {showConfig, showAddProject, showBack})
    expect(container.querySelector('#backToEditorBtn')).to.exist
    expect(container.querySelector('#backToImporterBtn')).to.not.exist
  })

  it('renders back button if project editor open', async () => {
    showConfig = false
    showAddProject = true
    const {container} = render(TogglePagesButton, {showConfig, showAddProject, showBack})
    expect(container.querySelector('#backToEditorBtn')).to.exist
    expect(container.querySelector('#backToImporterBtn')).to.not.exist
  })

  it('does not render back button if in dict editor', async () => {
    showConfig = false
    showAddProject = false
    const {container} = render(TogglePagesButton, {showConfig, showAddProject, showBack})
    expect(container.querySelector('#backToEditorBtn')).to.not.exist
    expect(container.querySelector('#backToImporterBtn')).to.exist
  })
})
