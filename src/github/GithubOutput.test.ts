import {act, fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import type {Dict, Project} from '../common/Project'
import {fake, stub} from 'sinon'
import GitHubOutput from './GitHubOutput.svelte'
import {GitHubClient} from './GitHubClient'

describe('GitHubOutput', () => {
  const dict: Dict = {}
  const lang = 'en'
  const config: Project = {title: '', url: 'api.github.com', token: '', indent: 2}

  async function clickSaveButton(message: string) {
    const {container} = render(GitHubOutput, {dict, lang, config})
    stub(window, 'prompt').returns(message)
    stub(window, 'confirm').returns(false)
    stub(GitHubClient.prototype, 'saveFile').resolves(undefined)
    const save = fake()
    const button = container.querySelector('button')!
    button.addEventListener('click', save)
    await fireEvent.click(button)
    return save
  }

  it('user gets prompt to commit changes on button click', async () => {
    const save = await clickSaveButton('')
    expect(save).called
    expect(prompt).called
    expect(GitHubClient.prototype.saveFile).not.called
  })

  it('user can change the default commit and save', async () => {
    const save = await clickSaveButton('Custom message')
    expect(save).called
    expect(prompt).calledWith('Commit message (what have you changed?)', 'Updated en translations')
    expect(GitHubClient.prototype.saveFile).calledWith(lang, dict, 'Custom message')
    await act(GitHubClient.prototype.saveFile)
    expect(confirm).called
  })
})
