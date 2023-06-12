import {AwsCodeCommitClient} from './AwsCodeCommitClient'
import {ProjectSource} from '../common/Project'
import {stub} from 'sinon'
import {expect} from 'chai'

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

      stub(client.client, 'getBranch').returns({promise: stub().resolves({branch: {commitId: parentCommitId}})} as any)
      stub(client.client, 'putFile').returns({promise: stub()} as any)

      client.setAuthor({name: 'Bob', email: 'bob@email.com'})
      await client.saveFile('en', {key: 'value'}, {key: undefined}, commitMessage)

      expect(client.client.getBranch).calledWith({
        repositoryName: 'repo-name',
        branchName: 'translations'
      })

      expect(client.client.putFile).calledWith({
        repositoryName: 'repo-name',
        branchName: 'translations',
        fileContent: '{\n  "key": "value"\n}',
        filePath: '/translationsPath/en.json',
        commitMessage,
        parentCommitId: parentCommitId,
        name: 'Bob',
        email: 'bob@email.com'
      })
    })
  })

  describe('getFileContent', () => {
    it('sends all credentials in POST request', async () => {
      const blobId = 'blobId'
      const parentCommitId = 'commitId'

      stub(client.client, 'getBranch').returns({promise: stub().resolves({branch: {commitId: parentCommitId}})} as any)
      stub(client.client, 'getFile').returns({promise: stub().resolves({blobId})} as any)
      stub(client.client, 'getBlob').returns({promise: stub().resolves({content: new TextEncoder().encode('{"key": "value"}')})} as any)

      client.setAuthor({name: 'Bob', email: 'bob@email.com'})
      await client.getFileContent('en.json')

      expect(client.client.getBranch).calledWith({
        repositoryName: 'repo-name',
        branchName: 'main'
      })

      expect(client.client.getFile).calledWith({
        repositoryName: 'repo-name',
        filePath: '/translationsPath/en.json',
        commitSpecifier: parentCommitId
      })

      expect(client.client.getBlob).calledWith({
        repositoryName: 'repo-name',
        blobId
      })
    })
  })
})