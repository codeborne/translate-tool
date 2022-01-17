import {act, fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import type {Project} from '../common/Project'
import {stub} from 'sinon'
import GitHubProjectImporter from './GitHubProjectImporter.svelte'
import {GitHubClient} from '../github/GitHubClient'
import jsonLoader from '../common/JsonLoader'

function setInputFields(container: HTMLElement) {
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
    {title:'project', url:'someurl', indent: 2, token:'123123', branch: 'translations'}
  ]

  it.skip('shows error if invalid inputs', async () => {
    stub(jsonLoader, 'request').resolves(undefined)
    stub(window, 'alert').resolves('error')

    const {container} = render(GitHubProjectImporter, {projects})
    const button = container.querySelector('button') as HTMLButtonElement
    setInputFields(container)
    await fireEvent.click(button)

    expect(jsonLoader.request).called
    await act(jsonLoader.request)

    expect(alert).called
    await act(alert)
  })

  it.skip('saves project on valid submit', async () => {
    const {container} = render(GitHubProjectImporter, {projects})
    const button = container.querySelector('button') as HTMLButtonElement
    expect(button.textContent).to.contain('Import')
    const inputs = setInputFields(container)
    let client = new GitHubClient({
      url: `https://api.github.com/repos/${inputs[1].value}/${inputs[2].value}/contents${inputs[3].value}`,
      token: inputs[4].value
    } as Project)

    stub(client, 'getFileContent').resolves(['en', 'de'])
    await fireEvent.click(button)
    expect(client.getFileContent).called
    // TODO improve test
  })
})

