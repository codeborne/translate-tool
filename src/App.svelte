<script lang="ts">
  import Navbar from './layout/Navbar.svelte'
  import {onMount} from 'svelte'
  import type {Project} from './common/Project'
  import {LoadedProject} from './common/Project'
  import LoadingSpinner from './common/LoadingSpinner.svelte'
  import jsonLoader from './common/JsonLoader'
  import LangSwitcher from './layout/LangSwitcher.svelte'
  import ProjectSwitcher from './layout/ProjectSwitcher.svelte'
  import ToggleConfigButton from './config/ToggleConfigButton.svelte'
  import DictEditor from './editor/DictEditor.svelte'
  import ProjectAddButton from './layout/ProjectAddButton.svelte'
  import ProjectImportList from './config/ProjectImportList.svelte'
  import ProjectSettings from './config/ProjectSettings.svelte'

  let showConfig = false, showAddProject = false
  let projects: Project[]
  let loadedProjects: LoadedProject[]
  let selectedProject: LoadedProject
  let lang: string

  onMount(async () => {
    projects = await tryLoadPreConfiguredProjects()
    if (!projects) projects = tryInitFromLocalStorage()
    !projects.length ? setupNewProjectIfNotExists() : await loadAllProjects()
  })

  function setupNewProjectIfNotExists() {
    projects = []
    selectedProject = new LoadedProject({url: '', token: '', title: '', indent: 2}, {})
    showAddProject = true
  }

  async function loadAllProjects() {
    if (projects.length) {
      console.log('here')
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
    <ProjectAddButton bind:showAddProject/>
    <LangSwitcher project={selectedProject} bind:lang/>
    <ToggleConfigButton bind:showConfig showBack={loadedProjects.length > 0}/>
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

  .container {
    max-width: 99%;
  }
</style>
