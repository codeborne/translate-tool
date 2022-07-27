<script>
  import {GitHubClient} from '../github/GitHubClient'
  import {BitBucketClient} from '../bitbucket/BitBucketClient'

  export let config
  export let defaultBranch

  $: if (config) handleBranchCheck()

  async function handleBranchCheck() {
    if (isVersionControlUrl(config) && !defaultBranch) defaultBranch = await getDefaultBranch() ?? 'base'
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