<script lang="ts">
  import ConfigEditor from './config/ConfigEditor.svelte'
  import Navbar from './layout/Navbar.svelte'
  import {onMount} from 'svelte'
  import type {LoadedProject, Project} from './common/Project'
  import LoadingSpinner from './common/LoadingSpinner.svelte'
  import jsonLoader from './common/JsonLoader'
  import LangSwitcher from './layout/LangSwitcher.svelte'
  import ProjectSwitcher from './layout/ProjectSwitcher.svelte'
  import ToggleConfigButton from './config/ToggleConfigButton.svelte'
  import DictEditor from './editor/DictEditor.svelte'

  let showConfig = false
  let projects: Project[]
  let loadedProjects: LoadedProject[]
  let selectedProject: LoadedProject
  let lang: string

  onMount(async () => {
    projects = await tryLoadPreConfiguredProjects()
    if (!projects) projects = tryInitFromLocalStorage()
    loadAllProjects()
  })

  async function loadAllProjects() {
    loadedProjects = await Promise.all(projects.map(p => jsonLoader.loadProject(p)))
    const lastTitle = localStorage.getItem('selectedProject')
    selectedProject = loadedProjects.find(p => p.title == lastTitle) ?? loadedProjects[0]
    showConfig = !selectedProject
  }

  function tryLoadPreConfiguredProjects() {
    return jsonLoader.loadJson('projects.json').catch(e => console.warn('No deployment argument file found.'))
  }

  function tryInitFromLocalStorage(): Project[] {
    return JSON.parse(localStorage.getItem('projects') ?? '[]')
  }

  function showUnhandledError(e: PromiseRejectionEvent) {
    console.error(e.reason)
    alert('Error, please reload the page:\n\n' + e.reason?.message ?? '')
  }
</script>

<svelte:window on:unhandledrejection={showUnhandledError}/>

<Navbar>
  {#if loadedProjects}
    {#if !showConfig}
      <ProjectSwitcher projects={loadedProjects} bind:selectedProject/>
      <LangSwitcher project={selectedProject} bind:lang/>
    {:else}
      <div class="flex-grow-1"></div>
    {/if}
    <ToggleConfigButton bind:showConfig showBack={loadedProjects.length > 0}/>
  {/if}
</Navbar>

<main class="my-3 container">
  {#if !loadedProjects}
    <LoadingSpinner class="my-5"/>
  {:else if showConfig}
    <ConfigEditor bind:projects on:changed={loadAllProjects}/>
  {:else if lang}
    <DictEditor project={selectedProject} {lang}/>
  {/if}
</main>

<style>
  :global(h1, h2, h3, h4, h5, h6) {
    color: #404142;
  }

  .container {
    max-width: 99%;
  }
</style>
