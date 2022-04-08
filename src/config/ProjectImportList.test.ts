import {fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import ProjectImportList from './ProjectImportList.svelte'

describe('ProjectImportList', () => {
  it('renders each individual import option', async () => {
    const {container} = render(ProjectImportList)
    expect(container.querySelector('.githubImport')!.textContent).to.contain('Via GitHub')
    expect(container.querySelector('.publicImport')!.textContent).to.contain('Via Public URL')
    expect(container.querySelector('.bitbucketImport')!.textContent).to.contain('Via BitBucket')
  })

  it('opens content on toggle event', async () => {
    const {container} = render(ProjectImportList)
    expect(container.querySelector('.githubImport .accordion-content')).to.not.exist
    expect(container.querySelector('.publicImport .accordion-content')).to.exist

    let accordion = container.querySelector('.githubImport .accordion-button')!
    await fireEvent.click(accordion)
    expect(container.querySelector('.githubImport .accordion-content')).to.exist

    accordion = container.querySelector('.bitbucketImport .accordion-button')!
    await fireEvent.click(accordion)
    expect(container.querySelector('.bitbucketImport .accordion-content')).to.exist
  })
})
