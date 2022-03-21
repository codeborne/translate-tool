import {act, fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import type {Project} from '../common/Project'
import {stub} from 'sinon'
import GitHubProjectImporter from './GitHubProjectImporter.svelte'
import {GitHubClient} from '../github/GitHubClient'

function fillProjectFields(container: HTMLElement) {
  const inputs = container.querySelectorAll('input')
  inputs[0].value = 'projectname'
  inputs[1].value = 'repoowner'
  inputs[2].value = 'reponame'
  inputs[3].value = 'path'
  inputs[4].value = 'token'
  expect(inputs[5].value).to.contain('translations')
  return inputs
}

describe('GitHubProjectImporter', () => {
  const projects: Project[] = [
    {title: 'project', url: 'someurl', indent: 2, token: '123123', branch: 'translations'}
  ]

  it('shows error if invalid project', async () => {
    stub(GitHubClient.prototype, 'getFileContent').resolves(undefined)

    const {container} = render(GitHubProjectImporter, {projects})
    fillProjectFields(container)
    await fireEvent.submit(container.querySelector('form')!)

    expect(GitHubClient.prototype.getFileContent).calledWith('langs.json')
    await act(GitHubClient.prototype.getFileContent)

    expect(container.querySelector('.alert-warning')!.textContent).to.contain('Could not load project')
  })

  it.skip('saves project on valid submit', async () => {
    const {container} = render(GitHubProjectImporter, {projects})
    const inputs = fillProjectFields(container)
    let client = new GitHubClient({
      url: `https://api.github.com/repos/${inputs[1].value}/${inputs[2].value}/contents${inputs[3].value}`,
      token: inputs[4].value
    } as Project)

    stub(client, 'getFileContent').resolves(['en', 'de'])
    await fireEvent.submit(container.querySelector('form')!)
    expect(client.getFileContent).called
    // TODO improve test
  })
})

