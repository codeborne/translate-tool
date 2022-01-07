<script lang="ts">
  export let user
</script>

{#if user}
  <div class="auth">
    <span class="form-text">Logged in as <b>{user.getName()}</b></span>
  </div>
{/if}

<style>
  .auth {
    display: flex;
    justify-content: end;
    margin: 0;
    padding: 0 var(--bs-gutter-x,.75rem);
  }

  .auth span {
    margin: 0
  }
</style>