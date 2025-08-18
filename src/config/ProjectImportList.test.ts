import { fireEvent, render } from '@testing-library/svelte'
import ProjectImportList from './ProjectImportList.svelte'

describe('ProjectImportList', () => {
  it('renders each individual import option', async () => {
    const { container } = render(ProjectImportList)
    expect(container.querySelector('.githubImport').textContent).toContain('Via GitHub')
    expect(container.querySelector('.publicImport').textContent).toContain('Via Public URL')
    expect(container.querySelector('.bitbucketImport').textContent).toContain('Via BitBucket')
    expect(container.querySelector('.awsCodeCommitImport').textContent).toContain('Via AWS CodeCommit')
  })

  it('opens content on toggle event', async () => {
    const { container } = render(ProjectImportList)
    expect(container.querySelector('.githubImport .accordion-content')).not.toBeInTheDocument()
    expect(container.querySelector('.publicImport .accordion-content')).toBeInTheDocument()

    let accordion = container.querySelector('.githubImport .accordion-button')
    await fireEvent.click(accordion)
    expect(container.querySelector('.githubImport .accordion-content')).toBeInTheDocument()

    accordion = container.querySelector('.bitbucketImport .accordion-button')
    await fireEvent.click(accordion)
    expect(container.querySelector('.bitbucketImport .accordion-content')).toBeInTheDocument()
  })
})
