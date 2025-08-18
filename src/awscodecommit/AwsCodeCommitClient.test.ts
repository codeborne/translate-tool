import { AwsCodeCommitClient } from './AwsCodeCommitClient';
import { ProjectSource } from '../common/Project';

describe('AwsCodeCommitClient', () => {
  const client = new AwsCodeCommitClient({
    title: 'Title',
    url: 'repo-name',
    branch: 'translations',
    sourceBranch: 'main',
    indent: 2,
    source: ProjectSource.AwsCodeCommit,
    region: 'region',
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
    sessionToken: 'sessionToken',
    translationsPath: '/translationsPath/'
  })

  describe('saveFile', () => {
    it('sends all credentials in POST request', async () => {
      const commitMessage = 'commit message'
      const parentCommitId = 'commitId'

      vi.spyOn(client.client, 'getBranch').mockResolvedValue({ branch: { commitId: parentCommitId } })
      vi.spyOn(client.client, 'putFile').mockResolvedValue(undefined)

      client.setAuthor({name: 'Bob', email: 'bob@email.com'})
      await client.saveFile('en', {key: 'value'}, {key: undefined}, commitMessage)

      expect(client.client.getBranch).toHaveBeenCalledWith({
        repositoryName: 'repo-name',
        branchName: 'translations',
      })

      expect(client.client.putFile).toHaveBeenCalledWith({
        repositoryName: 'repo-name',
        branchName: 'translations',
        fileContent: new TextEncoder().encode(`{
  "key": "value"
}`),
        filePath: '/translationsPath/en.json',
        commitMessage,
        parentCommitId: parentCommitId,
        name: 'Bob',
        email: 'bob@email.com',
      })
    })
  })

  describe('getFileContent', () => {
    it('sends all credentials in POST request', async () => {
      const blobId = 'blobId'
      const parentCommitId = 'commitId'

      vi.spyOn(client.client, 'getBranch').mockResolvedValue({branch: {commitId: parentCommitId}})
      vi.spyOn(client.client, 'getFile').mockResolvedValue({blobId})
      vi.spyOn(client.client, 'getBlob').mockResolvedValue({content: new TextEncoder().encode('{"key": "value"}')})

      client.setAuthor({ name: 'Bob', email: 'bob@email.com' });
      await client.getFileContent('en.json');

      expect(client.client.getBranch).toHaveBeenCalledWith({
        repositoryName: 'repo-name',
        branchName: 'main',
      })

      expect(client.client.getFile).toHaveBeenCalledWith({
        repositoryName: 'repo-name',
        filePath: '/translationsPath/en.json',
        commitSpecifier: parentCommitId,
      })

      expect(client.client.getBlob).toHaveBeenCalledWith({
        repositoryName: 'repo-name',
        blobId,
      })
    })
  })
})
