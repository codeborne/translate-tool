<script lang="ts">
  export let showConfigButton
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light outline">
  <div class="container-fluid">
    <a class="navbar-brand text-dark" href="#"><h3>Translation Tool <i class="fas fa-globe"></i></h3></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
      {#if !showConfigButton}
        <button type="button" class="btn btn-outline-secondary bg-white text-dark" on:click={() => (showConfigButton = true)}>
          Project Settings <i class="fas fa-wrench"></i>
        </button>
      {/if}
    </div>
  </div>
</nav>

<style>
  .outline {
    border-bottom: 1px solid lightgray;
  }
  .btn-outline-secondary {
    border: 1px solid lightgray;
  }
</style>