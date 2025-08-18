import type { Project } from '../common/Project'
import jsonLoader from '../common/JsonLoader'
import { BitBucketClient } from './BitBucketClient'

vi.mock('../common/JsonLoader', () => ({
  __esModule: true,
  default: {
    loadJson: vi.fn(),
    loadProjects: vi.fn(),
    request: vi.fn(),
    loadFor: vi.fn()
  }
}))

describe('BitBucketClient', () => {
  const client = new BitBucketClient({
    url: 'https://api.bitbucket.org/2.0/repositories/owner/repo/src/main/i18n/',
    token: '123123:123123',
    branch: 'main'
  } as Project)

  const sameNameClient = new BitBucketClient({
    url: 'https://api.bitbucket.org/2.0/repositories/owner/owner/src/translations/i18n/common/',
    token: '123123:123123'
  } as Project)

  const extraClient = new BitBucketClient({
    url: 'https://api.bitbucket.org/2.0/repositories/somename/somename/src/master/i18n/',
    token: '123123:123123',
    branch: 'custom'
  } as Project)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('sends Authorization header', async () => {
    jsonLoader.request.mockResolvedValue(undefined)
    vi.spyOn(client, 'tokenHeader').mockResolvedValue({ Authorization: 'Bearer ACCESS_TOKEN' })
    await client.request('http://url', { method: 'PUT', headers: { Authorization: 'Bearer ACCESS_TOKEN' } })
    expect(jsonLoader.request).toHaveBeenCalled()
  })

  it('fetches access token if token present', async () => {
    vi.spyOn(client, 'getAccessToken').mockResolvedValue({ access_token: 'validToken', refresh_token: '', token_type: '', expires_in: 1, scopes: '' })
    vi.spyOn(client, 'fetchFile').mockResolvedValue(undefined)
    jsonLoader.request.mockResolvedValue(undefined)
    await client.getFileContent('file.json')
    expect(client.getAccessToken).toHaveBeenCalled()
    expect(client.fetchFile).toHaveBeenCalledWith('https://api.bitbucket.org/2.0/repositories/owner/repo/src/main/i18n/file.json', 'validToken')
  })

  it('returns directory url', async () => {
    const result: string = client.getDirectoryUrl()
    const result2: string = sameNameClient.getDirectoryUrl()
    const result3: string = extraClient.getDirectoryUrl()
    expect(result).toEqual('i18n/')
    expect(result2).toEqual('i18n/common/')
    expect(result3).toEqual('i18n/')
  })

  it('returns repository root url', async () => {
    const result: string = client.getRootUrl()
    const result2: string = sameNameClient.getRootUrl()
    const result3: string = extraClient.getRootUrl()
    expect(result).toEqual('https://api.bitbucket.org/2.0/repositories/owner/repo')
    expect(result2).toEqual('https://api.bitbucket.org/2.0/repositories/owner/owner')
    expect(result3).toEqual('https://api.bitbucket.org/2.0/repositories/somename/somename')
  })

  it('returns commit list url', async () => {
    const result: string = client.getCommitsUrl()
    const result2: string = sameNameClient.getCommitsUrl()
    const result3: string = extraClient.getCommitsUrl()
    expect(result).toEqual('https://bitbucket.org/owner/repo/commits')
    expect(result2).toEqual('https://bitbucket.org/owner/owner/commits')
    expect(result3).toEqual('https://bitbucket.org/somename/somename/commits')
  })

  it('returns source branch from the given url in config', async () => {
    const result: string = client.findSourceBranch()
    const result2: string = sameNameClient.findSourceBranch()
    const result3: string = extraClient.findSourceBranch()
    expect(result).toEqual('main')
    expect(result2).toEqual('translations')
    expect(result3).toEqual('master')
  })

  it('returns url with custom branch', async () => {
    const result: string = client.getUrlWithCustomBranch()
    const result2: string = sameNameClient.getUrlWithCustomBranch()
    const result3: string = extraClient.getUrlWithCustomBranch()
    expect(result).toEqual('https://api.bitbucket.org/2.0/repositories/owner/repo/src/main/i18n/')
    expect(result2).toEqual('https://api.bitbucket.org/2.0/repositories/owner/owner/src/translations/i18n/common/')
    expect(result3).toEqual('https://api.bitbucket.org/2.0/repositories/somename/somename/src/custom/i18n/')
  })
})
