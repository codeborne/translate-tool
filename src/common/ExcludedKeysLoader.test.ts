import {expect} from 'chai'
import {excludedKeysLoader} from './ExcludeKeysLoader'
import type {Project} from './Project'
import {stub} from 'sinon'
import jsonLoader from './JsonLoader'

describe('ExcludedKeys', () => {

  const response: Set<string> = new Set(['test1', 'test2'])
  const project: Project = {
    title: 'Title', url: 'url', indent: 2
  }

  it('calls jsonLoader and returns array of strings', async () => {
    stub(jsonLoader, 'loadFor').resolves(response)
    expect(await excludedKeysLoader.fetch(project)).to.deep.equal(response)
    expect(jsonLoader.loadFor).calledWith(project, 'dont-translate-keys')
  })
})
