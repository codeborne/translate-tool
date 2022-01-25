<script lang="ts">

  import type {LoadedProject} from '../common/Project'

  export let projects: LoadedProject[]
  export let selectedProject: LoadedProject

  function handleProjectSelect(project: LoadedProject) {
    selectedProject = project
    localStorage.setItem('selectedProject', selectedProject.title)
  }

</script>

<ul class="navbar-nav me-auto mb-2 mb-lg-0">
  {#each projects as p}
    <a class="nav-link" class:active={p === selectedProject} on:click|preventDefault={() => handleProjectSelect(p)}>
      {p.title}
    </a>
  {/each}
</ul>

<style>
  .nav-link {
    position: relative;
    cursor: pointer;
  }
  .nav-link:hover:after {
    content: '';
    display: block;
    position: absolute;
    bottom: -0.5rem;
    left:0;
    width: 100%;
    height: 3px;
    opacity: 0.5;
    background: dodgerblue;
    transition: opacity 0.25s ease-in;
  }

  .nav-link:after {
    content: '';
    display: block;
    position: absolute;
    bottom: -0.5rem;
    left:0;
    width: 100%;
    height: 3px;
    background: dodgerblue;
    opacity: 0;
  }
  .nav-link.active:after {
    opacity: 1;
  }
</style>
