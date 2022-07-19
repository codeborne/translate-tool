<script>
  import {GitHubClient} from '../github/GitHubClient'
  import {BitBucketClient} from '../bitbucket/BitBucketClient'

  export let config
  export let defaultBranch

  $: if (config) handleBranchCheck()

  async function handleBranchCheck() {
    let result
    if (isVersionControlUrl(config)) {
      try {
        result = await doesBranchExist()
        defaultBranch = (result) ? config.branch ?? 'translations' : ''
      } catch (e) {
        console.warn(`The project ${config.title} does not have a branch called ${config.branch ?? 'translations'}.`)
      } finally {
        if (!result) defaultBranch = await getDefaultBranch() ?? 'base'
      }
    }
  }

  async function doesBranchExist() {
    let result
    if (config.url.includes(GitHubClient.host)) result =
      await new GitHubClient(config).getFileContentNoCatch('langs.json')
    else if (config.url.includes(BitBucketClient.host)) result =
      await new BitBucketClient(config).getFileContentNoCatch('langs.json', config.branch ?? 'translations')
    return !!result
  }

  async function getDefaultBranch() {
    if (config.url.includes(GitHubClient.host)) return await new GitHubClient(config).findDefaultBranch()
    else if (config.url.includes(BitBucketClient.host)) return new BitBucketClient(config).findDefaultBranch()
  }

  function isVersionControlUrl(config) {
    if (config?.url.includes(GitHubClient.host)) return true
    else return !!config?.url.includes(BitBucketClient.host)
  }

</script>

{#if defaultBranch && isVersionControlUrl(config)}
  <div class="ms-3 w-100 branch text-secondary text-small">
    <i class="fas fa-code-branch" title='Loaded from {defaultBranch} branch'></i>
    Loaded from <b>{defaultBranch}</b> branch
  </div>
{/if}