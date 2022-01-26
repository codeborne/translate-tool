<script lang="ts">

  import type {Dict, Project} from '../common/Project'
  import {BitBucketClient} from './BitBucketClient'
  import {createEventDispatcher} from 'svelte'
  import type {GoogleProfile} from '../common/GoogleTypes'

  export let dict: Dict
  export let lang: string
  export let config: Project
  export let user: GoogleProfile|undefined

  let client

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
      await client.saveFile(lang, dict, commitMessage)
      dispatch('saved')
      alert('Saved to BitBucket successfully')
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
    <i class="fab fa-bitbucket"></i>
  {/if}
  Save to <i>{client.branch}</i> branch
</button>
