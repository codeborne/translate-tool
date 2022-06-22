<script lang="ts">

  import type {Dict, Project} from '../common/Project'
  import {createEventDispatcher} from 'svelte'
  import type {GoogleProfile} from '../common/GoogleTypes'
  import {clientFor, VersionControlClient} from '../common/VersionControlClient'
  import SpinnerIcon from '../components/SpinnerIcon.svelte'

  export let dict: Dict
  export let defaultDict: Dict
  export let lang: string
  export let config: Project
  export let user: GoogleProfile|undefined

  const dispatch = createEventDispatcher()

  let client: VersionControlClient
  $: client = clientFor(config)

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
    if (user) client.setAuthor(user)
  }
</script>

<button on:click={save} class="btn btn-primary w-auto" disabled={inProgress}>
  {#if inProgress}
    <SpinnerIcon/>
  {:else}
    <i class="{client.icon}"></i>
  {/if}
  Save to <b>{client.branch}</b> branch
</button>
