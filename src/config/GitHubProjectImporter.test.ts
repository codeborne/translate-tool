import {act, fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import {fake, match, stub} from 'sinon'
import GitHubProjectImporter from './GitHubProjectImporter.svelte'
import {GitHubClient} from '../github/GitHubClient'

async function fillProjectFields(container: HTMLElement) {
  const inputs = [...container.querySelectorAll('input')]
  inputs[0].value = 'projectname'
  inputs[1].value = 'repoowner'
  inputs[2].value = 'reponame'
  inputs[3].value = '/path/'
  inputs[4].value = 'token'
  expect(inputs[5].value).to.contain('translations')
  await Promise.all(inputs.map(async i => await fireEvent.input(i)))
  return inputs
}

describe('GitHubProjectImporter', () => {
  it('shows error if invalid project', async () => {
    stub(GitHubClient.prototype, 'getFileContent').resolves(undefined)

    const {container} = render(GitHubProjectImporter)
    await fillProjectFields(container)
    await fireEvent.submit(container.querySelector('form')!)

    expect(GitHubClient.prototype.getFileContent).calledWith('langs.json')
    await act(GitHubClient.prototype.getFileContent)

    expect(container.querySelector('.alert-warning')!.textContent).to.contain('Could not load project')
  })

  it('saves project on valid submit', async () => {
    const {container, component} = render(GitHubProjectImporter)
    const inputs = await fillProjectFields(container)

    stub(GitHubClient.prototype, 'getFileContent').resolves(['en', 'de'])
    const importedCallback = fake()
    component.$on('imported', importedCallback)
    await fireEvent.submit(container.querySelector('form')!)
    expect(component.project.url).to.eq(`https://api.github.com/repos/${inputs[1].value}/${inputs[2].value}/contents${inputs[3].value}`)

    expect(GitHubClient.prototype.getFileContent).calledWith('langs.json')
    expect(container.querySelector('.alert-warning')).to.not.exist
    expect(component.project.token).to.eq(inputs[4].value)
    expect(importedCallback).calledWith(match({detail: component.project}))
  })
})

