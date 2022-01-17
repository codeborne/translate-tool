import {fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import SimpleProjectImporter from './SimpleProjectImporter.svelte'
import type {Project} from '../common/Project'
import {tick} from 'svelte'
import {stub} from 'sinon'

describe('SimpleProjectImporter', () => {
  const projects: Project[] = [
    {title:'project', url:'someurl', indent: 2, token:'123123'}
  ]
  it('shows error if invalid url', async () => {
    const {container} = render(SimpleProjectImporter, {projects})
    const button = container.querySelector('button') as HTMLButtonElement
    expect(button.textContent).to.contain('Import')
    expect(container.querySelector('.alert')).to.not.exist
    const inputs = container.querySelectorAll('input')
    inputs[0].value = 'name'
    inputs[1].value = 'https://test.com/test/'
    await fireEvent.click(button)
    await tick()
    expect(container.querySelector('.alert')).to.exist
  })

  it('saves project on valid submit', async () => {
    const {container} = render(SimpleProjectImporter, {projects})
    const button = container.querySelector('button') as HTMLButtonElement
    expect(button.textContent).to.contain('Import')
    const inputs = container.querySelectorAll('input')
    inputs[0].value = 'name'
    inputs[1].value = 'https://test.com/test/'
    stub(window, 'fetch').resolves({json: async () => ['en', 'de']} as Response)
    await fireEvent.click(button)
    await tick()

    // TODO improve these tests
  })
})
