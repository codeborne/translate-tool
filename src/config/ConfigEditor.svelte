<script lang="ts">
  import ProjectSettings from './ProjectSettings.svelte'
  import type {Project} from '../common/Project'
  import ProjectImportList from './ProjectImportList.svelte'

  export let projects: Project[]
  export let selectedProject: Project

  let showImporters: boolean = !(projects.length > 0)


  function onAddProjectClick() {
    showImporters = !showImporters
    console.log(showImporters)
  }

</script>

<svelte:window on:show={onAddProjectClick}/>

{#if showImporters}
  <ProjectImportList bind:projects on:changed/>
{:else}
    <ProjectSettings bind:projects bind:selectedProject on:changed/>
{/if}

