<script lang="ts">
  import type {LoadedProject} from '../Project'

  export let projects: LoadedProject[]
  export let selectedProject: LoadedProject
  export let showConfig: boolean
</script>

<nav id="top" class="navbar navbar-expand-lg navbar-light bg-white outline">
  <div class="container-fluid">
    <a class="navbar-brand text-dark" href="#"><h3>Translation Tool <i class="fas fa-globe"></i></h3></a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarText">
      {#if !showConfig}
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          {#each projects as p}
            <a class="nav-link" class:active={p === selectedProject} href on:click|preventDefault={() => selectedProject = p}>
              {p.title}
            </a>
          {/each}
        </ul>
      {/if}

      <div>
        {#if !showConfig}
          <button id="backToImporterBtn" type="button" class="btn btn-outline-secondary bg-light text-dark" on:click={() => showConfig = true}>
            Project Settings <i class="fas fa-wrench"></i>
          </button>
        {/if}
        {#if showConfig && projects.length > 0}
          <button id="backToEditorBtn" type="button" class="btn btn-outline-secondary bg-light text-dark" on:click={() => showConfig = false}>
            Back to Editor <i class="fas fa-arrow-circle-right"></i>
          </button>
        {/if}
      </div>
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
  .nav-link.active {
    border-bottom: 3px solid dodgerblue;
  }
</style>