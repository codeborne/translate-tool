import {expect} from 'chai'
import {excluded} from './ExcludeKeys'
import type {Project} from './Project'
import {stub} from 'sinon'
import jsonLoader from './JsonLoader'

describe('ExcludedKeys', () => {

  const response = ['test1', 'test2']
  const project: Project = {
    title: 'Title', url: 'url', indent: 2
  }

  it('calls jsonLoader and returns array of strings', async () => {
    stub(jsonLoader, 'loadFor').resolves(response)
    expect(await excluded.fetch(project)).to.equal(response)
    expect(jsonLoader.loadFor).calledWith(project, 'dont-translate-keys')
  })
})
