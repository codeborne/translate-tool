<script lang="ts">
  import ProjectSettings from './ProjectSettings.svelte'
  import type {Project} from '../common/Project'
  import ProjectImportList from './ProjectImportList.svelte'

  export let projects: Project[]
</script>

{#if projects.length > 0}
  <ProjectSettings bind:projects on:changed/>
{/if}

<ProjectImportList bind:projects/>
