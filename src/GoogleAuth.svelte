<script lang="ts">

  import {onMount} from 'svelte'

  let GoogleAuth
  let clientId: string
  let user

  onMount(() => {
    clientId = '530758130588-2smj2veadedmqa5eemrjund6aivhr1al.apps.googleusercontent.com'
    load()
  })

  async function handleLogin() {
    await GoogleAuth.signIn()
    checkForLoggedInUser()
  }

  function checkForLoggedInUser() {
    if (GoogleAuth.isSignedIn.get()) {
      user = GoogleAuth.currentUser.get().getBasicProfile();
      console.log('User is logged in: ' + user.getName());
    } else {
      console.log('not signed')
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

{#if user}
  <button class="btn" on:click={handleLogout}>
    <i class="fab fa-google"></i> Sign out
  </button>
{:else}
  <button class="btn" on:click={handleLogin}>
    <i class="fab fa-google"></i> Sign in
  </button>
{/if}