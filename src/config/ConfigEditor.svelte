<script lang="ts">
  import ProjectSettings from './ProjectSettings.svelte'
  import type {Project} from '../common/Project'
  import ProjectImportList from './ProjectImportList.svelte'

  export let projects: Project[]
  export let selectedProject: Project

  let showImporters: boolean = !(projects.length > 0)

  function onAddProjectClick() {
    if (projects.length > 0) showImporters = !showImporters
  }

</script>

<button on:click={onAddProjectClick}>test</button>

{#if showImporters}
  <ProjectImportList bind:projects on:changed/>
{:else}
    <ProjectSettings bind:projects bind:selectedProject on:changed/>
{/if}

