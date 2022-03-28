import {act, fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import BitBucketProjectImporter from './BitBucketProjectImporter.svelte'
import {fake, match, stub} from 'sinon'
import {BitBucketClient} from '../bitbucket/BitBucketClient'

describe('BitBucketProjectImporter', () => {

  async function fillProjectFields(container: HTMLElement) {
    const inputs = [...container.querySelectorAll('input')]
    inputs[0].value = 'projectname'
    inputs[1].value = 'repoowner'
    inputs[2].value = 'reponame'
    inputs[3].value = 'main'
    inputs[4].value = '/path/'
    inputs[5].value = 'token'
    inputs[6].value = 'translations'
    await Promise.all(inputs.map(async i => await fireEvent.input(i)))
    expect(inputs[3].value).to.contain('main')
    return inputs
  }

  it('shows error if invalid project', async () => {
    stub(BitBucketClient.prototype, 'getFileContent').resolves(undefined)
    const {container} = render(BitBucketProjectImporter)
    await fillProjectFields(container)
    await fireEvent.submit(container.querySelector('form')!)
    expect(BitBucketClient.prototype.getFileContent).calledWith('langs.json')
    await act(BitBucketClient.prototype.getFileContent)
    expect(container.querySelector('.alert-warning')!.textContent).to.contain('Could not load project')
  })

  it('saves project on valid submit', async () => {
    const {container, component} = render(BitBucketProjectImporter)
    const inputs = await fillProjectFields(container)

    stub(BitBucketClient.prototype, 'getFileContent').resolves(['en', 'de'])
    const importedCallback = fake()
    component.$on('imported', importedCallback)
    await fireEvent.submit(container.querySelector('form')!)
    expect(component.project.url).to.eq(`https://api.bitbucket.org/2.0/repositories/repoowner/reponame/src/main/path/`)

    expect(BitBucketClient.prototype.getFileContent).calledWith('langs.json')
    expect(container.querySelector('.alert-warning')).to.not.exist
    expect(component.project.token).to.eq(inputs[5].value)
    expect(importedCallback).calledWith(match({detail: component.project}))
  })
})
