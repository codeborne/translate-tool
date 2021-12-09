<script lang="ts">
  import {Dict, Project} from '../common/Project'
  import {GitHubClient} from './GitHubClient'

  export let dict: Dict
  export let lang: string
  export let config: Project

  const client = new GitHubClient(config)

  async function push() {
    const result = await client.saveFile(lang, dict)
    if (confirm(`Saved to ${client.branch}, open it for review?`))
      window.open(result.commit.html_url, '_blank')
  }
</script>

<div class="mt-3 card p-3">
  <div class="d-flex justify-content-between mb-3">
    <button on:click={push} class="btn btn-primary w-auto"><i class="fas fa-save me-1"></i> Save to <i>{client.branch}</i> branch</button>
    <a class="btn btn-primary" href="#top">Jump to top</a>
  </div>
</div>
