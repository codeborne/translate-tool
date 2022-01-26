import type {Project} from '../common/Project'
import {stub} from 'sinon'
import jsonLoader from '../common/JsonLoader'
import {expect} from 'chai'
import {BitBucketClient} from './BitBucketClient'

describe('BitBucketClient', () => {
  const client = new BitBucketClient({
    url: 'https://api.bitbucket.org/2.0/repositories/owner/repo/src/main/i18n/',
    token: '123123:123123'
  } as Project)

  const sameNameClient = new BitBucketClient({
    url: 'https://api.bitbucket.org/2.0/repositories/owner/owner/src/translations/i18n/',
    token: '123123:123123'
  } as Project)

  it('sends Authorization header', async () => {
    stub(jsonLoader, 'request')
    stub(client, 'tokenHeader').resolves({Authorization: 'Bearer ACCESS_TOKEN'})
    await client.request('http://url', {method: 'PUT', headers: {'Authorization': 'Bearer ACCESS_TOKEN'}})
    expect(jsonLoader.request).called
  })

  it('fetches access token if token present', async () => {
    stub(client, 'getAccessToken').resolves({access_token: 'validToken', refresh_token: '', token_type: '', expires_in: 1, scopes: ''})
    stub(client, 'fetchFile').resolves()
    stub(client, 'request').resolves()
    await client.getFile('file.json')
    expect(client.getAccessToken).called
    expect(client.fetchFile).calledWith('https://api.bitbucket.org/2.0/repositories/owner/repo/src/main/i18n/file.json', 'validToken')
  })

  it('returns directory url', async () => {
    const result: string = client.getDirectoryUrl()
    const result2: string = sameNameClient.getDirectoryUrl()
    expect(result).to.equal('i18n/')
    expect(result2).to.equal('i18n/')
  })

  it('returns repository root url', async () => {
    const result: string = client.getRootUrl()
    const result2: string = sameNameClient.getRootUrl()
    expect(result).to.equal('https://api.bitbucket.org/2.0/repositories/owner/repo')
    expect(result2).to.equal('https://api.bitbucket.org/2.0/repositories/owner/owner')
  })

  it('returns commit list url', async () => {
    const result: string = client.getCommitsUrl()
    const result2: string = sameNameClient.getCommitsUrl()
    expect(result).to.equal('https://bitbucket.org/owner/repo/commits')
    expect(result2).to.equal('https://bitbucket.org/owner/owner/commits')
  })

  it('returns default branch from the given url in config', async () => {
    const result: string = client.findDefaultBranch()
    const result2: string = sameNameClient.findDefaultBranch()
    expect(result).to.equal('main')
    expect(result2).to.equal('translations')
  })

  it('returns url with custom branch', async () => {
    const result: string = client.getUrlWithCustomBranch()
    const result2: string = sameNameClient.getUrlWithCustomBranch()
    expect(result).to.equal('https://api.bitbucket.org/2.0/repositories/owner/repo/src/main/i18n/')
    expect(result2).to.equal('https://api.bitbucket.org/2.0/repositories/owner/owner/src/translations/i18n/')
  })
})