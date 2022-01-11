import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import BranchLoadedFrom from './BranchLoadedFrom.svelte'
import type {Project} from '../common/Project'

describe('BranchLoadedFrom', () => {
  let config: Project = {url: 'api.github.com', token: 'token', indent: 2, title: 'title'}

  it('renders default branch if no branch in config', async () => {
    const {container} = render(BranchLoadedFrom, { config })
    const text = container.querySelector('div')?.textContent
    expect(text).to.contain('Translations loaded from translations branch')
  })

  it('renders custom branch from config', async () => {
    config.branch = 'test'
    const {container} = render(BranchLoadedFrom, { config })
    const text = container.querySelector('div')?.textContent
    expect(text).to.contain('Translations loaded from test branch')
  })

  it('does not render if not a github project', async () => {
    config.url = 'not.github.url'
    const {container} = render(BranchLoadedFrom, { config })
    expect(container.querySelector('.form-text')).to.not.exist
  })
})
