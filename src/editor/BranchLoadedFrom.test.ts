import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import BranchLoadedFrom from './BranchLoadedFrom.svelte'
import type {Project} from '../common/Project'
import {GitHubClient} from '../github/GitHubClient'
import {stub} from 'sinon'

describe('BranchLoadedFrom', () => {
  let config: Project = {url: 'https://api.github.com/repos/org/repo/contents/i18n/', token: 'token', indent: 2, title: 'title'}

  const client = new GitHubClient(config)

  it.skip('renders main branch if it does not exist or have any contents', async () => {
    stub(client, 'getFileContentNoCatch').resolves('value that is not empty')
    const {container} = render(BranchLoadedFrom, { config })
    expect(client.getFileContentNoCatch).called // TODO consult on why this doesn't work
    // await act(client.getFileContentNoCatch)
    const text = container.querySelector('div')?.textContent
    expect(text).to.contain('Translations loaded from main branch')
  })

  it.skip('renders custom/translations branch from config', async () => {
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
