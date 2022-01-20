<script>
  import {GitHubClient} from '../github/GitHubClient'
  import {BitBucketClient} from '../bitbucket/BitBucketClient'

  export let config

  let branch = config.branch

  $: if (config) handleBranchCheck()

  async function handleBranchCheck() {
    let result
    if (isVersionControlUrl()) {
      try {
        result = await doesBranchExist()
        branch = (result) ? config.branch ?? 'translations' : ''
      } catch (e) {
        console.warn(`The project ${config.title} does not have a branch called ${config.branch ?? 'translations'}.`)
      }
      if (!result) branch = await getDefaultBranch() ?? 'base'
    }
  }

  async function doesBranchExist() {
    let result
    if (config.url.includes(GitHubClient.host)) result =
      await new GitHubClient(config).getFileContentNoCatch('langs.json')
    else if (config.url.includes(BitBucketClient.host)) result =
      await new BitBucketClient(config).getFileNoCatch('langs.json', config.branch ?? 'translations')
    return !!result
  }

  async function getDefaultBranch() {
    if (config.url.includes(GitHubClient.host)) return await new GitHubClient(config).findDefaultBranch()
    else if (config.url.includes(BitBucketClient.host)) return 'main'
  }

  function isVersionControlUrl() {
    if (config.url.includes(GitHubClient.host)) return true
    else return !!config.url.includes(BitBucketClient.host);
  }

</script>

{#if branch && isVersionControlUrl()}
  <div class="form-text">
    <i class="fas fa-code-branch"></i>
    Translations loaded from <b>{branch}</b> branch
  </div>
{/if}