<script lang="ts">
  export let showConfigButton
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Translation Tool</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
<!--        <li class="nav-item">-->
<!--          <a class="nav-link active" aria-current="page" href="#">Home</a>-->
<!--        </li>-->
      </ul>
      {#if !showConfigButton}
        <button type="button" class="btn btn-primary" on:click={() => (showConfigButton = true)}>
          Import config
        </button>
      {/if}
    </div>
  </div>
</nav>