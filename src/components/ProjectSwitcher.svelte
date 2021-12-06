<script lang="ts">
  import {LoadedProject} from '../Project'

  export let projects: LoadedProject[]
  export let selectedProject: LoadedProject
</script>

<ul class="navbar-nav me-auto mb-2 mb-lg-0">
  {#each projects as p}
    <a class="nav-link" class:active={p === selectedProject} href on:click|preventDefault={() => selectedProject = p}>
      {p.title}
    </a>
  {/each}
</ul>
