import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import BranchLoadedFrom from './BranchLoadedFrom.svelte'
import type {Project} from '../common/Project'

describe('BranchLoadedFrom', () => {
  let config: Project = {url: 'url', token: 'token', indent: 2, title: 'title'}
  it('renders default branch if no branch in config', async () => {
    const {container} = render(BranchLoadedFrom, { config })
    expect(container.querySelector('div')).to.contain('TODO')
  })
})
