import {act, render} from '@testing-library/svelte'
import {expect} from 'chai'
import LangImporter from './LangImporter.svelte'
import {stub} from 'sinon'

describe('<LangImporter>', () => {
  const selectedProject = 'testproject'
  const projects: any[] = ['a','b']

  it('render ProjectSettings if there are projects found', () => {
    const {getByText} = render(LangImporter, {selectedProject, projects})
    const e = getByText(/Manage Projects/i)
    expect(document.body.contains(e))
  })

  it('renders AddPrivateProject', async () => {
    const {getByText} = render(LangImporter, {selectedProject, projects})
    const e = getByText(/Import a private/i)
    expect(document.body.contains(e))
  })

  it('renders AddPublicProject', async () => {
    const {getByText} = render(LangImporter, {selectedProject, projects})
    const e = getByText(/Import a public dictionary/i)
    expect(document.body.contains(e))
  })
})