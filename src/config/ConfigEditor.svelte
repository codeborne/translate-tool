<script lang="ts">
  import ProjectSettings from './ProjectSettings.svelte'
  import SimpleProjectImporter from './SimpleProjectImporter.svelte'
  import GitHubProjectImporter from './GitHubProjectImporter.svelte'
  import type {Project} from '../common/Project'

  export let projects: Project[]
</script>

{#if projects.length > 0}
  <ProjectSettings bind:projects on:changed/>
{/if}

<SimpleProjectImporter bind:projects on:changed/>
<GitHubProjectImporter bind:projects on:changed/>
