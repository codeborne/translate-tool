import {fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import type {Project} from '../common/Project'
import {tick} from 'svelte'
import {stub} from 'sinon'
import GitHubProjectImporter from './GitHubProjectImporter.svelte'
import {GitHubClient} from '../github/GitHubClient'

describe('GitHubProjectImporter', () => {
  const projects: Project[] = [
    {title:'project', url:'someurl', indent: 2, token:'123123'}
  ]

  it('shows error if invalid inputs', async () => {
    let container: HTMLElement
    ({container} = render(GitHubProjectImporter, {projects}))
    const button = container.querySelector('button') as HTMLButtonElement
    expect(button.textContent).to.contain('Import')
    expect(container.querySelector('.alert')).to.not.exist
    const inputs = container.querySelectorAll('input')
    inputs[0].value = 'projectname'
    inputs[1].value = 'repoowner'
    inputs[2].value = 'reponame'
    inputs[3].value = 'path'
    inputs[4].value = 'token'
    let client = new GitHubClient({
      url: `https://api.github.com/repos/${inputs[1].value}/${inputs[2].value}/contents${inputs[3].value}`,
      token: inputs[4].value
    } as Project)
    stub(client, 'getFileContent').resolves(undefined)
    await fireEvent.click(button)
    await tick()
    // TODO improve test
  })

  it('saves project on valid submit', async () => {
    const {container} = render(GitHubProjectImporter, {projects})
    const button = container.querySelector('button') as HTMLButtonElement
    expect(button.textContent).to.contain('Import')
    const inputs = container.querySelectorAll('input')
    inputs[0].value = 'projectname'
    inputs[1].value = 'repoowner'
    inputs[2].value = 'reponame'
    inputs[3].value = '/i18n/'
    inputs[4].value = 'token'

    let client = new GitHubClient({
      url: `https://api.github.com/repos/${inputs[1].value}/${inputs[2].value}/contents${inputs[3].value}`,
      token: inputs[4].value
    } as Project)

    stub(client, 'getFileContent').resolves(['en', 'de'])
    await fireEvent.click(button)
    await tick()
    expect(fetch)
    // TODO improve test
  })
})

