<script lang="ts">

  import {onMount} from 'svelte'
  import type {GoogleAuthUser} from './GoogleAuthUser'

  export let user: GoogleAuthUser

  let GoogleAuth
  let clientId: string

  onMount(() => {
    clientId = '530758130588-2smj2veadedmqa5eemrjund6aivhr1al.apps.googleusercontent.com'
    if (clientId) load()
  })

  async function handleLogin() {
    await GoogleAuth.signIn()
    checkForLoggedInUser()
  }

  function checkForLoggedInUser() {
    if (GoogleAuth.isSignedIn.get()) {
      user = GoogleAuth.currentUser.get().getBasicProfile();
    } else {
      user = undefined
    }
  }

  async function load() {
    gapi.load('auth2', () => {
      GoogleAuth = gapi.auth2.init({
        client_id: clientId
      })
      GoogleAuth.then(checkForLoggedInUser);
    });
  }

  async function handleLogout() {
    let auth = gapi.auth2.getAuthInstance()
    await auth.signOut().then(() => {
      checkForLoggedInUser()
    });
  }
</script>

{#if clientId}
  {#if user}
    <button class="btn btn-light" on:click={handleLogout}>
      <i class="fab fa-google"></i> Log out
    </button>
  {:else}
    <button class="btn btn-light" on:click={handleLogin}>
      <i class="fab fa-google"></i> Login
    </button>
  {/if}
{/if}