<script lang="ts">
  import LangEditor from './components/LangEditor.svelte'
  import LangImporter from './components/LangImporter.svelte'
  import Navbar from './components/Navbar.svelte'
  import {onMount} from 'svelte'
  import type {Project, LoadedProject} from './Project'
  import LoadingSpinner from './components/LoadingSpinner.svelte'
  import jsonLoader from './JsonLoader'

  let showConfig = false
  let projects: Project[]
  let loadedProjects: LoadedProject[]
  let selectedProject: LoadedProject

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
  <Navbar projects={loadedProjects} bind:selectedProject bind:showConfig/>
  <main class="mt-5 mb-5 container">
    {#if showConfig}
<!--      <LangImporter bind:projects bind:selectedProjectTitle bind:isOpen={showConfig}/>-->
    {:else}
<!--      <LangEditor bind:project={selectedProject} bind:selectedProjectTitle/>-->
    {/if}
  </main>
{:else}
  <LoadingSpinner/>
{/if}
