<script lang="ts">
  import ConfigEditor from './components/config/ConfigEditor.svelte'
  import Navbar from './components/Navbar.svelte'
  import {onMount} from 'svelte'
  import type {LoadedProject, Project} from './Project'
  import LoadingSpinner from './components/LoadingSpinner.svelte'
  import jsonLoader from './JsonLoader'
  import LangSwitcher from "./components/LangSwitcher.svelte";
  import ProjectSwitcher from "./components/ProjectSwitcher.svelte";
  import ToggleConfigButton from "./components/config/ToggleConfigButton.svelte";

  let showConfig = false
  let projects: Project[]
  let loadedProjects: LoadedProject[]
  let selectedProject: LoadedProject
  let lang: string

  onMount(async () => {
    projects = await tryLoadPreConfiguredProjects()
    if (!projects) projects = tryInitFromLocalStorage()
    loadedProjects = await Promise.all(projects.map(p => jsonLoader.loadProject(p)))
    const lastTitle = localStorage.getItem('selectedProject')
    selectedProject = loadedProjects.find(p => p.title == lastTitle) ?? loadedProjects[0]
    showConfig = !selectedProject
  })

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

{#if loadedProjects}
  <Navbar>
    {#if !showConfig}
      <ProjectSwitcher projects={loadedProjects} bind:selectedProject/>
      <LangSwitcher project={selectedProject} bind:lang/>
    {:else}
      <div class="flex-grow-1"></div>
    {/if}
    <ToggleConfigButton bind:showConfig showBack={loadedProjects.length > 0}/>
  </Navbar>

  <main class="mt-5 mb-5 container">
    {#if showConfig}
      <ConfigEditor bind:projects/>
    {:else}
<!--      <LangEditor bind:project={selectedProject} bind:selectedProjectTitle/>-->
    {/if}
  </main>
{:else}
  <LoadingSpinner/>
{/if}
