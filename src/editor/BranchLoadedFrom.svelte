<script>
  import {GitHubClient} from '../github/GitHubClient'
  import {BitBucketClient} from '../bitbucket/BitBucketClient'
  import {fly} from 'svelte/transition'

  export let config
  export let projectMeta

  $: if (config) handleBranchCheck()

  async function handleBranchCheck() {
    if (isVersionControlUrl(config) && !projectMeta?.branchLoadedFrom) projectMeta.branchLoadedFrom = await getDefaultBranch() ?? 'base'
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

{#if projectMeta && isVersionControlUrl(config)}
  <div class="ms-3 branch text-secondary text-small" in:fly|local={{delay: 100, x: 100}}>
    <i class="fas fa-code-branch" title='Loaded from {projectMeta.branchLoadedFrom} branch'></i>
    Loaded from <b>{projectMeta.branchLoadedFrom}</b> branch
  </div>
{/if}

<style>
  .branch {
    white-space: nowrap;
  }
</style>