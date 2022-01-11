<script lang="ts">

  import {onMount} from 'svelte'
  import type {GoogleAuthUser} from './GoogleAuthUser'
  import jsonLoader from './JsonLoader'

  export let user: GoogleAuthUser

  let GoogleAuth
  let clientId: string

  onMount(async () => {
    await loadAuthInfo()
    if (clientId) await init()
  })

  async function loadAuthInfo() {
    const authFile: Record<string, any> = await tryLoadAuthFile()
    if (!authFile) return
    clientId = authFile['google']['client_id']
  }

  async function tryLoadAuthFile() {
    return jsonLoader.loadJson('auth.json').catch()
  }

  async function handleLogin() {
    try {
      await GoogleAuth.signIn()
    } catch {}
    checkForLoggedInUser()
  }

  function checkForLoggedInUser() {
    if (GoogleAuth.isSignedIn.get()) {
      user = GoogleAuth.currentUser.get().getBasicProfile()
    } else {
      user = undefined
    }
  }

  async function init() {
    gapi.load('auth2', () => {
      GoogleAuth = gapi.auth2.init({
        client_id: clientId
      })
      GoogleAuth.then(checkForLoggedInUser)
    })
  }

  async function handleLogout() {
    let auth = gapi.auth2.getAuthInstance()
    await auth.signOut().then(() => {
      checkForLoggedInUser()
    })
  }
</script>

{#if clientId}
  {#if user}
    <button class="btn btn-outline-secondary logout" on:click={handleLogout}>
      <i class="fab fa-google"></i> Log out
    </button>
  {:else}
    <button class="btn btn-outline-secondary login" on:click={handleLogin}>
      <i class="fab fa-google"></i> Login
    </button>
  {/if}
{/if}