<script lang="ts">
  import {onMount} from 'svelte'
  import jsonLoader from './JsonLoader'
  import type {GoogleProfile} from './GoogleTypes'

  export let user: GoogleProfile|undefined

  onMount(async () => {
    user = await tryLoadProfile() ?? undefined
  })

  async function tryLoadProfile() {
    return await jsonLoader.loadJson('user').catch(() => console.warn('No user profile found.')) as GoogleProfile
  }

  function handleLogout() {
    window.location.replace(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/logout`)
  }
</script>

{#if user}
  <button class="btn btn-outline-secondary logout" on:click={handleLogout}>
    <i class="fas fa-sign-out-alt"></i> {user.name ?? 'Log out'}
  </button>
{/if}
