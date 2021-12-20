<script lang="ts">
  import {Dict, Project} from '../common/Project'
  import {GitHubClient} from './GitHubClient'

  export let dict: Dict
  export let lang: string
  export let config: Project

  $: client = new GitHubClient(config)
  let inProgress = false

  async function save() {
    inProgress = true
    let commitMessage: string|null = await window.prompt("Write down your commit message\n\nLeave it blank for the default commit message")
    if (!commitMessage.length) commitMessage = null
    try {
      const result = await client.saveFile(lang, dict, commitMessage)
      if (confirm(`Saved to ${client.branch}, open it for review?`))
        window.open(result.commit.html_url, '_blank')
    } finally {
      inProgress = false
    }
  }
</script>

<button on:click={save} class="btn btn-primary w-auto" disabled={inProgress}>
  <i class="fas fa-save me-1"></i> Save to <i>{client.branch}</i> branch
</button>
