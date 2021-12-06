import {act, render} from '@testing-library/svelte'
import {expect} from 'chai'
import LangImporter from './LangImporter.svelte'

describe('<LangImporter>', () => {
  const projects: any[] = ['a','b']
  const isOpen = true
  const selectedProjectTitle = ''

  it('render ProjectSettings if there are projects found', () => {
    const {getByText} = render(LangImporter, {projects, isOpen, selectedProjectTitle})
    const e = getByText(/Manage Projects/i)
    expect(document.body.contains(e))
  })

  it('renders AddPrivateProject', async () => {
    const {getByText} = render(LangImporter, {projects, isOpen})
    const e = getByText(/Import a private/i)
    expect(document.body.contains(e))
  })

  it('renders AddPublicProject', async () => {
    const {getByText} = render(LangImporter, {projects, isOpen})
    const e = getByText(/Import a public dictionary/i)
    expect(document.body.contains(e))
  })
})