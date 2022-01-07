<script lang="ts">

  import type {Dict, Project} from '../common/Project'
  import {GitHubClient} from './GitHubClient'
  import type {GoogleAuthUser} from '../common/GoogleAuthUser'

  export let dict: Dict
  export let lang: string
  export let config: Project
  export let user: GoogleAuthUser

  $: client = new GitHubClient(config)
  let inProgress = false

  async function save() {
    inProgress = true
    checkIfUserExists()
    const commitMessage = prompt('Commit message (what have you changed?)', `Updated ${lang} translations`)
    try {
      if (!commitMessage) return
      const result = await client.saveFile(lang, dict, commitMessage)
      if (confirm(`Saved to ${client.branch}, open it for review?`))
        window.open(result.commit.html_url, '_blank')
    } finally {
      inProgress = false
    }
  }

  function checkIfUserExists() {
    if (user) {
      client.setAuthorEmail(user.getEmail())
      client.setAuthorName(user.getName())
    }
  }
</script>

<button on:click={save} class="btn btn-primary w-auto" disabled={inProgress}>
  <i class="fas fa-save me-1"></i> Save to <i>{client.branch}</i> branch
</button>
