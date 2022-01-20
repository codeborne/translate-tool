<script>
  import {GitHubClient} from '../github/GitHubClient'
  import {BitBucketClient} from '../bitbucket/BitBucketClient'

  export let config

  let branch = config.branch

  $: if (config) handleBranchCheck()

  async function handleBranchCheck() {
    if (isVersionControlUrl()) {
      try {
        const result = await doesBranchExist()
        branch = (result) ? config.branch ?? 'translations' : 'main'
      } catch (e) {
        branch = 'main'
        console.warn(`The project ${config.title} does not have a branch called ${config.branch ?? 'translations'}.`)
      }
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