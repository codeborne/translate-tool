<script lang="ts">
  import type {GoogleAuthUser} from './GoogleAuthUser'

  export let user: GoogleAuthUser = undefined

  async function handleLogout() {
    window.location.replace(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/logout`)
  }
</script>

<button class="btn btn-outline-secondary logout" on:click={handleLogout}>
  <i class="fas fa-sign-out-alt"></i> Log out
</button>