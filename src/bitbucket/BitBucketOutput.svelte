<script lang="ts">

  import type {Dict, Project} from '../common/Project'
  import {BitBucketClient} from './BitBucketClient'
  import type {GoogleAuthUser} from '../common/GoogleAuthUser'
  import {createEventDispatcher} from 'svelte'

  export let dict: Dict
  export let lang: string
  export let config: Project
  export let user: GoogleAuthUser

  const dispatch = createEventDispatcher()

  $: client = new BitBucketClient(config)

  $: if (user) client = new BitBucketClient(config)

  $: if (config.branch) setBranchIfConfigured()

  let inProgress = false

  function setBranchIfConfigured() {
    client.branch = (config.branch) ? config.branch : 'translations'
  }

  async function save() {
    inProgress = true
    checkIfUserExistsAndSetAuthor()
    setBranchIfConfigured()
    await tryCommit()
  }

  async function tryCommit() {
    const commitMessage = prompt('Commit message (what have you changed?)', `Updated ${lang} translations`)
    try {
      if (!commitMessage) return
      const result = await client.saveFile(lang, dict, commitMessage)
      dispatch('saved')
      if (confirm(`Saved to ${client.branch}, open it for review?`))
        window.open(result.commit.html_url, '_blank')
    } finally {
      inProgress = false
    }
  }

  function checkIfUserExistsAndSetAuthor() {
    if (user) {
      client.setAuthorEmail(user.getEmail())
      client.setAuthorName(user.getName())
    }
  }
</script>

<button on:click={save} class="btn btn-primary w-auto" disabled={inProgress}>
  <i class="fab fa-bitbucket"></i> Save to <i>{client.branch}</i> branch
</button>
