<script lang="ts">

  import type {Dict, Project} from '../common/Project'
  import {createEventDispatcher} from 'svelte'
  import type {GoogleProfile} from '../common/GoogleTypes'
  import {BitBucketClient} from '../bitbucket/BitBucketClient'
  import {GitHubClient} from '../github/GitHubClient'

  export let dict: Dict
  export let defaultDict: Dict
  export let lang: string
  export let config: Project
  export let user: GoogleProfile|undefined

  function setClient(config: Project): GitHubClient|BitBucketClient {
    if (config.url.includes(GitHubClient.host)) return new GitHubClient(config)
    else if (config.url.includes(BitBucketClient.host)) return new BitBucketClient(config)
  }

  let client: GitHubClient|BitBucketClient

  const dispatch = createEventDispatcher()

  $: client = setClient(config)

  $: if (user) client = setClient(config)

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
      await client.saveFile(lang, dict, defaultDict, commitMessage)
      dispatch('saved')
      alert(`Saved to ${client.label} successfully`)
    } finally {
      inProgress = false
    }
  }

  function checkIfUserExistsAndSetAuthor() {
    if (user) {
      client.setAuthorEmail(user.email)
      client.setAuthorName(user.name)
    }
  }
</script>

<button on:click={save} class="btn btn-primary w-auto" disabled={inProgress}>
  {#if inProgress}
    <i class="fas fa-circle-notch fa-spin"></i>
  {:else}
    <i class="{client.icon}"></i>
  {/if}
  Save to <b>{client.branch}</b> branch
</button>
