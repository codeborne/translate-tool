import { GitHubClient, GitHubFile } from './GitHubClient'
import type { Project } from '../common/Project'
import jsonLoader from '../common/JsonLoader'

describe('GithubClient', () => {
  const client = new GitHubClient({
    url: 'https://api.github.com/repos/org/repo/contents/i18n/',
    token: 'secret'
  } as Project)

  it('sends Authorization header', async () => {
    vi.spyOn(jsonLoader, 'request')
    client.request('http://url', { method: 'PUT', headers: { 'Content-Type': 'text/hello' } })
    expect(jsonLoader.request).toHaveBeenCalledWith('http://url', { method: 'PUT', headers: { 'Content-Type': 'text/hello', Authorization: 'token secret' } })
  })

  it('decodes base64 content', async () => {
    const githubResponse = { encoding: 'base64', content: 'eyJ0ZXN0IjoxMjN9Cg==' } as GitHubFile
    vi.spyOn(client, 'request').mockResolvedValue(githubResponse)
    const content = await client.getFileContent('en.json')
    expect(content).toEqual({ test: 123 })
  })
})
