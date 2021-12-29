<script lang="ts">
  import ProjectSettings from './ProjectSettings.svelte'
  import type {Project} from '../common/Project'
  import ProjectImportList from './ProjectImportList.svelte'
  import {createEventDispatcher} from 'svelte'

  export let projects: Project[]
  export let selectedProject: Project

  const dispatch = createEventDispatcher()

  const onChanged = () => dispatch('changed')


  let showImporters: boolean

  function onAddPrompt() {
    if (projects.length) return false
  }
</script>

{#if projects.length > 0}
  <ProjectSettings bind:projects bind:selectedProject on:changed={onChanged}/>
{/if}

<ProjectImportList bind:projects on:changed={onChanged}/>
