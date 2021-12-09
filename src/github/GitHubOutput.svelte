<script lang="ts">
  import {Dict, Project} from '../common/Project'
  import {GitHubClient} from './GitHubClient'

  export let dict: Dict
  export let lang: string
  export let config: Project

  let inProgress = false
  const client = new GitHubClient(config)

  async function save() {
    inProgress = true
    const result = await client.saveFile(lang, dict)
    inProgress = false
    if (confirm(`Saved to ${client.branch}, open it for review?`))
      window.open(result.commit.html_url, '_blank')
  }
</script>

<button on:click={save} class="btn btn-primary w-auto" disabled={inProgress}>
  <i class="fas fa-save me-1"></i> Save to <i>{client.branch}</i> branch
</button>
