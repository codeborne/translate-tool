<script>
  import {GitHubClient} from '../github/GitHubClient'
  import {BitBucketClient} from '../bitbucket/BitBucketClient'

  export let config

  let branch = config.branch

  $: if (config) isVersionControl()

  async function isVersionControl() {
    try {
      let result
      if (config.url.includes(GitHubClient.host)) result =
        await new GitHubClient(config).getFileContentNoCatch('langs.json')
      else if (config.url.includes(BitBucketClient.host)) result =
        await new BitBucketClient(config).getFileNoCatch('langs.json', config.branch ?? 'translations')
      if (result) branch = config.branch ?? 'translations'
      else branch = 'main'
    } catch (e) {
      branch = 'main'
      console.warn(`The project ${config.title} does not have a branch called ${config.branch ?? 'translations'}.`)
    }
  }

  function isVersionControlUrl() {
    if (config.url.includes(GitHubClient.host)) return true
    else if (config.url.includes(BitBucketClient.host)) return true
    else return false
  }

</script>

{#if branch && isVersionControlUrl()}
  <div class="form-text">
    <i class="fas fa-code-branch"></i>
    Translations loaded from <b>{branch}</b> branch
  </div>
{/if}