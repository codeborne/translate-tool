import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import ConfigEditor from './ConfigEditor.svelte'
import type {Project} from '../common/Project'

describe('<ConfigEditor>', () => {
  const projects = [{title: 'Hello'} as Project]

  it('render ProjectSettings if there are projects found', () => {
    const {getByText} = render(ConfigEditor, {projects})
    const e = getByText(/Manage Projects/i)
    expect(document.body.contains(e))
  })

  it('renders AddPrivateProject', async () => {
    const {getByText} = render(ConfigEditor, {projects})
    const e = getByText(/Import a private/i)
    expect(document.body.contains(e))
  })

  it('renders AddPublicProject', async () => {
    const {getByText} = render(ConfigEditor, {projects})
    const e = getByText(/Import a public dictionary/i)
    expect(document.body.contains(e))
  })
})