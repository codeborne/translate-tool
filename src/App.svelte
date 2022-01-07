<script lang="ts">
  import Navbar from './layout/Navbar.svelte'
  import {onMount} from 'svelte'
  import type {Project} from './common/Project'
  import {LoadedProject} from './common/Project'
  import LoadingSpinner from './common/LoadingSpinner.svelte'
  import jsonLoader from './common/JsonLoader'
  import LangSwitcher from './layout/LangSwitcher.svelte'
  import ProjectSwitcher from './layout/ProjectSwitcher.svelte'
  import ToggleConfigButton from './config/TogglePagesButton.svelte'
  import DictEditor from './editor/DictEditor.svelte'
  import ProjectAddButton from './layout/ProjectAddButton.svelte'
  import ProjectImportList from './config/ProjectImportList.svelte'
  import ProjectSettings from './config/ProjectSettings.svelte'
  import GoogleAuth from './GoogleAuth.svelte'
  import {decodeBase64Unicode} from './common/utils'

  let showConfig = false, showAddProject = false
  let projects: Project[]
  let loadedProjects: LoadedProject[]
  let selectedProject: LoadedProject
  let lang: string

  $: if (!showConfig) showAddProject = false

  onMount(async () => {
    projects = await tryLoadPreConfiguredProjects()
    if (!projects) projects = tryInitFromLocalStorage()
    await tryLoadSharedUrl()
    if (projects) localStorage.setItem('projects', JSON.stringify(projects))
    !projects.length ? setupNewProjectIfNotExists() : await loadAllProjects()
  })

  async function tryLoadSharedUrl() {
    const urlParams = new URLSearchParams(window.location.search)
    if (!urlParams.has('shared')) return
    try {
      const sharedProject: Project = JSON.parse(decodeBase64Unicode(urlParams.get('shared')!))
      if (projects.find((p) => p.title === sharedProject.title)) sharedProject.title = `${sharedProject.title} (Duplicate)`
      projects.push(sharedProject)
    } catch (e: any) {
      if (e.message) alert(`Something went wrong while parsing the shared link and the project was not added.\n\nError message:\n${e.message}`)
    }
    window.history.replaceState(null, null!, window.location.pathname);
  }

  function setupNewProjectIfNotExists() {
    projects = []
    selectedProject = new LoadedProject({url: '', token: '', title: '', indent: 2}, {})
    showAddProject = true
  }

  async function loadAllProjects() {
    if (projects.length) {
      loadedProjects = await Promise.all(projects.map(p => jsonLoader.loadProject(p)))
      const lastTitle = localStorage.getItem('selectedProject')
      selectedProject = (loadedProjects.find(p => p.title == lastTitle) ?? loadedProjects[0])
      showAddProject = !selectedProject
    } else {
      setupNewProjectIfNotExists()
      loadedProjects = []
    }
  }

  async function tryLoadPreConfiguredProjects() {
    return jsonLoader.loadJson('projects.json').catch(() => console.warn('No deployment argument file found.'))
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
  {#if loadedProjects && loadedProjects.length}
    <ProjectSwitcher projects={loadedProjects} bind:selectedProject/>
    <div class="nav-responsive">
      {#if !showConfig && !showAddProject}
        <LangSwitcher project={selectedProject} bind:lang/>
      {/if}
      <ProjectAddButton bind:showAddProject/>
      <ToggleConfigButton bind:showAddProject bind:showConfig showBack={loadedProjects.length > 0}/>
      <GoogleAuth/>
    </div>
  {/if}
</Navbar>

<main class="my-3 container">
  {#if !loadedProjects && !selectedProject}
    <LoadingSpinner class="my-5"/>
  {:else if showAddProject}
    <ProjectImportList bind:projects on:changed={loadAllProjects}/>
  {:else if showConfig}
    <ProjectSettings bind:selectedProject={selectedProject.config} bind:projects on:changed={loadAllProjects}/>
  {:else if lang}
    <DictEditor project={selectedProject} {lang}/>
  {/if}
</main>

<style>
  :global(a) {
    cursor: pointer;
  }

  :global(h1, h2, h3, h4, h5, h6) {
    color: #404142;
  }

  .nav-responsive {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
  }

  .container {
    max-width: 99%;
  }
</style>
