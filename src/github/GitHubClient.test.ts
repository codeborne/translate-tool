import {GitHubClient, GitHubFile} from './GitHubClient'
import type {Project} from '../common/Project'
import {stub} from 'sinon'
import {expect} from 'chai'
import jsonLoader from '../common/JsonLoader'

describe('GithubClient', () => {
  const client = new GitHubClient({
    url: 'https://api.github.com/repos/org/repo/contents/i18n/',
    token: 'secret'
  } as Project)

  it('sends Authorization header', async () => {
    stub(jsonLoader, 'request')
    client.request('http://url', {method: 'PUT', headers: {'Content-Type': 'text/hello'}})
    expect(jsonLoader.request).calledWith('http://url', {method: 'PUT', headers: {'Content-Type': 'text/hello', 'Authorization': 'token secret'}})
  })

  it('decodes base64 content', async () => {
    const githubResponse = {encoding: 'base64', content: 'eyJ0ZXN0IjoxMjN9Cg=='} as GitHubFile
    stub(client, 'request').resolves(githubResponse)
    const content = await client.getFileContent(client.config.url + 'en.json') // TODO: pass just the filename here
    expect(content).to.deep.eq({test: 123})
  })
})
