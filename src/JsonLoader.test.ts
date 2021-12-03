import JsonLoader from './JsonLoader'
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
    stub(jsonLoader, 'load').resolves(response)
    expect(await jsonLoader.load(project, 'tests')).to.equal(response)
    expect(jsonLoader.load).calledWith(project, 'tests')
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

  it('decodes base64-encoded content in GitHub API response', async () => {
    const githubResponse = {encoding: 'base64', content: 'eyJ0ZXN0IjoxMjN9Cg=='} // content -> '{test:123}' in base64
    stub(jsonLoader, 'loadJson').resolves(githubResponse)

    expect(await jsonLoader.load(project, 'de')).to.deep.equal({test: 123})
    expect(jsonLoader.loadJson).calledWith('some_project_url/de.json',{headers: { Authorization: 'token ' + project.token }})
  })
})