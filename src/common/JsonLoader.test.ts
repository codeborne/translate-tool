import jsonLoader from './JsonLoader'
import {expect} from 'chai'
import {stub} from 'sinon'
import type {Project} from './Project'

describe('JsonLoader', () => {
  let project: Project = {
    title: 'some+project',
    url: 'some_project_url/langs.json',
    token: 'some_access_token',
    indent: 2
  }
  const response = ['test1', 'test2']

  it('successfully returns a response', async () => {
    stub(jsonLoader, 'loadFor').resolves(response)
    expect(await jsonLoader.loadFor(project, 'tests')).to.equal(response)
    expect(jsonLoader.loadFor).calledWith(project, 'tests')
  })

  it('returns error if fetch fails', async () => {
    try {
      stub(window, 'fetch').resolves({ok: false} as Response)
      await jsonLoader.loadJson(project.url)
      throw 'expecting failure'
      // @ts-ignore
    } catch (e: Error) {
      expect(e.message).to.eq(`Failed to load ${project.url}`)
    }
  })
})
