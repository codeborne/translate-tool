import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import BranchLoadedFrom from './BranchLoadedFrom.svelte'
import type {Project} from '../common/Project'

describe('BranchLoadedFrom', () => {
  let config: Project = {url: 'https://api.github.com/repos/org/repo/contents/i18n/', token: 'token', indent: 2, title: 'title'}
  let defaultBranch = config.branch ?? 'translations'

  it('renders custom/translations branch from config', async () => {
    config.branch = 'test'
    defaultBranch = 'test'
    const {container} = render(BranchLoadedFrom, { config, defaultBranch })
    const text = container.querySelector('.branch')!.textContent
    expect(text).to.contain('Loaded from test branch')
  })

  it('does not render if not a github project', async () => {
    config.url = 'not.github.url'
    const {container} = render(BranchLoadedFrom, { config, defaultBranch })
    expect(container.querySelector('.branch')).to.not.exist
  })
})
