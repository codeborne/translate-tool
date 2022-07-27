<script lang="ts">

  import type {LoadedProject, Project} from '../common/Project'
  import localProjectStore from '../common/LocalProjectStore'
  import {createEventDispatcher} from 'svelte'

  export let projects: Project[]
  export let selectedProject: Project

  const dispatch = createEventDispatcher()

  function handleProjectSelect(project: Project) {
    localProjectStore.setSelectedProject(selectedProject)
    dispatch('selected', project)
  }

</script>

<ul class="navbar-nav me-auto mb-2 mb-lg-0">
  {#each projects as p}
    <a class="nav-link px-lg-3" class:active={p.title === selectedProject.title} on:click|preventDefault={() => handleProjectSelect(p)}>
      {p.title}
    </a>
  {/each}
</ul>
