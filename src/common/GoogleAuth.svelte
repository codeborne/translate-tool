<script lang="ts">
  import {onMount} from 'svelte'
  import jsonLoader from './JsonLoader'

  export let user: GoogleProfile|undefined

  export interface GoogleProfile {
    id: number,
    email: string,
    verified_email: boolean,
    name: string,
    given_name: string,
    family_name: string,
    picture: string,
    locale: string
  }

  onMount(async () => {
    user = await tryLoadProfile() ?? undefined
  })

  async function tryLoadProfile() {
    return await jsonLoader.loadJson('user').catch(() => console.warn('No user profile found.')) as GoogleProfile
  }

  async function handleLogout() {
    window.location.replace(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/logout`)
  }
</script>

{#if user}
  <button class="btn btn-outline-secondary logout" on:click={handleLogout}>
    <i class="fas fa-sign-out-alt"></i> {user.name ?? 'Log out'}
  </button>
{/if}