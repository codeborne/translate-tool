<script lang="ts">
  import NavbarProjectTab from "./NavbarProjectTab.svelte";

  export let projectNames: string[]
  export let selectedProject: string = ''
  export let showConfigButton: boolean

</script>

<nav id="top" class="navbar navbar-expand-lg navbar-light bg-white outline">
  <div class="container-fluid">
    <a class="navbar-brand text-dark" href="#"><h3>Translation Tool <i class="fas fa-globe"></i></h3></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
<!--      <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>-->
      {#if projectNames}
      <div class="collapse navbar-collapse">
        {#each projectNames as name}
        <NavbarProjectTab title={name} bind:selectedProject bind:isImporterOpen={showConfigButton} />
        {/each}
      </div>
      {/if}

      </div>
      <div>
        {#if !showConfigButton}
          <button type="button" class="btn btn-outline-secondary bg-light text-dark" on:click={() => (showConfigButton = true)}>
            Project Settings <i class="fas fa-wrench"></i>
          </button>
        {/if}
        {#if showConfigButton && projectNames.length > 0}
          <button type="button" class="btn btn-outline-secondary bg-light text-dark" on:click={() => (showConfigButton = false)}>
            Back to Editor <i class="fas fa-arrow-circle-right"></i>
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