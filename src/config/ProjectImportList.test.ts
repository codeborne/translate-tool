import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import ProjectImportList from './ProjectImportList.svelte'

describe('ProjectImportList', () => {
  it('renders each individual import option', async () => {
    const {container} = render(ProjectImportList)
    expect(container.querySelector('.githubImport')!.textContent).to.contain('Via GitHub')
    expect(container.querySelector('.publicImport')!.textContent).to.contain('Via Public URL')
    expect(container.querySelector('.bitbucketImport')!.textContent).to.contain('Via BitBucket')
  })
})
