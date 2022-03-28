<script lang="ts">

  import type {LoadedProject} from '../common/Project'
  import localProjectStore from '../common/LocalProjectStore'

  export let projects: LoadedProject[]
  export let selectedProject: LoadedProject

  function handleProjectSelect(project: LoadedProject) {
    selectedProject = project
    localProjectStore.setSelectedProject(selectedProject.config)
  }

</script>

<ul class="navbar-nav me-auto mb-2 mb-lg-0">
  {#each projects as p}
    <a class="nav-link px-lg-3" class:active={p === selectedProject} on:click|preventDefault={() => handleProjectSelect(p)}>
      {p.title}
    </a>
  {/each}
</ul>
