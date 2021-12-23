<script lang="ts">
  import ProjectSettings from './ProjectSettings.svelte'
  import type {Project} from '../common/Project'
  import {LoadedProject} from '../common/Project'
  import ProjectImportList from './ProjectImportList.svelte'

  export let projects: Project[]
  export let selectedProject: LoadedProject
</script>

{#if projects.length > 0}
  <ProjectSettings bind:projects bind:selectedProject on:changed/>
{/if}

<ProjectImportList bind:projects/>
