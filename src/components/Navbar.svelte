<script lang="ts">
  import NavbarProjectTab from "./NavbarProjectTab.svelte";

  export let projectTitles: string[]
  export let selectedProjectTitle: string = ''
  export let showConfig: boolean
</script>

<nav id="top" class="navbar navbar-expand-lg navbar-light bg-white outline">
  <div class="container-fluid">
    <a class="navbar-brand text-dark" href="#"><h3>Translation Tool <i class="fas fa-globe"></i></h3></a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    {#if !showConfig}
      <div class="collapse navbar-collapse" id="navbarText">
        <div class="collapse navbar-collapse">
          {#each projectTitles as title}
            <NavbarProjectTab {title} bind:selectedProjectTitle />
          {/each}
        </div>
      </div>
    {/if}

    <div>
      {#if !showConfig}
        <button id="backToImporterBtn" type="button" class="btn btn-outline-secondary bg-light text-dark" on:click={() => showConfig = true}>
          Project Settings <i class="fas fa-wrench"></i>
        </button>
      {/if}
      {#if showConfig && projectTitles.length > 0}
        <button id="backToEditorBtn" type="button" class="btn btn-outline-secondary bg-light text-dark" on:click={() => showConfig = false}>
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