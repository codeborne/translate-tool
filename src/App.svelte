<script lang="ts">
  import Navbar from './layout/Navbar.svelte'
  import {afterUpdate, onMount, tick} from 'svelte'
  import type {Project} from './common/Project'
  import {LoadedProject} from './common/Project'
  import LoadingSpinner from './common/LoadingSpinner.svelte'
  import jsonLoader from './common/JsonLoader'
  import LangSwitcher from './layout/LangSwitcher.svelte'
  import ProjectSwitcher from './layout/ProjectSwitcher.svelte'
  import ProjectSettingsButton from './layout/ProjectSettingsButton.svelte'
  import ToggleBackButton from './config/ToggleBackButton.svelte'
  import DictEditor from './editor/DictEditor.svelte'
  import ProjectAddButton from './layout/ProjectAddButton.svelte'
  import ProjectImportList from './config/ProjectImportList.svelte'
  import ProjectSettings from './config/ProjectSettings.svelte'
  import GoogleAuth from './common/GoogleAuth.svelte'
  import {decodeBase64Unicode} from './common/utils'
  import type {GoogleProfile} from './common/GoogleTypes'
  import localProjectStore from './common/LocalProjectStore'
  import Error from './common/Error.svelte'

  let showConfig = false, showAddProject = false
  let projects: Project[]
  let loadedProjects: LoadedProject[]
  let selectedProject: LoadedProject
  let lang: string
  let user: GoogleProfile|undefined
  let loading = false

  $: if (!showConfig) showAddProject = false

  onMount(async () => {
    projects = await tryLoadPreConfiguredProjects()
    if (!projects) projects = localProjectStore.getProjects()
    await handleSharedUrl()
    if (projects) localProjectStore.setProjects(projects)
    !projects.length ? setupNewProjectIfNotExists() : await loadLastProject()
  })

  async function handleSharedUrl() {
    const urlParams = new URLSearchParams(window.location.search)
    if (!urlParams.has('shared')) return
    await tryLoadSharedUrl(urlParams.get('shared')!)
    window.history.replaceState(null, null!, window.location.pathname);
  }

  async function tryLoadSharedUrl(encoded: string) {
    try {
      const sharedProject: Project = JSON.parse(decodeBase64Unicode(encoded))
      projects = projects.filter(p => p.title !== sharedProject.title)
      projects.push(sharedProject)
    } catch (e: any) {
      if (e.message) alert(`Something went wrong while parsing the shared link and the project was not added.\n\nError message:\n${e.message}`)
    }
  }

  function setupNewProjectIfNotExists() {
    projects = []
    selectedProject = new LoadedProject({url: '', token: '', title: '', indent: 2}, {})
    showAddProject = true
  }

  async function loadLastProject() {
    await loadProject(projects.find(p => p.title === localProjectStore.getSelectedProject()) ?? projects[0])
    showAddProject = !selectedProject
  }

  function projectImported(e: CustomEvent) {
    showConfig = false
    const project = e.detail
    projects = projects.concat(project)
    localProjectStore.setProjects(projects)
    localProjectStore.setSelectedProject(project)
    loadProject(project)
  }

  async function loadProjects() {
    loadedProjects = await jsonLoader.loadProjects(projects)
    selectedProject = (loadedProjects.find(p => p.title == localProjectStore.getSelectedProject()) ?? loadedProjects[0])
    showConfig = false
  }

  async function loadProject(project: Project) {
    selectedProject = await jsonLoader.loadProject(project)
    if (!loadedProjects) loadedProjects = []
    loadedProjects = [...loadedProjects, selectedProject]
  }

  async function tryLoadPreConfiguredProjects() {
    return jsonLoader.loadJson('projects.json').catch(() => console.warn('No deployment argument file found.')) as Project[]
  }

  function showUnhandledError(e: PromiseRejectionEvent) {
    console.error(e.reason)
    alert('Error, please reload the page:\n\n' + e.reason?.message ?? '')
  }

  function switchProject(e: CustomEvent) {
    loading = true
    const newProject: Project = e.detail
    const existingLoadedProject = loadedProjects.find(lp => lp.title === newProject.title)
    if (existingLoadedProject) selectedProject = existingLoadedProject
    else loadProject(newProject)
    localProjectStore.setSelectedProject(selectedProject.config)
    setTimeout(() => loading = false) // setTimeout keeps loading the state in correct order in Svelte's lifecycle
  }
</script>

<svelte:window on:unhandledrejection={showUnhandledError}/>

<Navbar>
  {#if loadedProjects && loadedProjects.length}
    <ProjectSwitcher projects={projects} selectedProject={selectedProject.config} on:selected={switchProject}/>
    <div class="nav-responsive">
      {#if !showConfig && !showAddProject && selectedProject.langs.length}
        <LangSwitcher project={selectedProject} bind:lang/>
      {/if}
      <ProjectAddButton bind:showAddProject/>
      <ProjectSettingsButton bind:showAddProject bind:showConfig/>
      <GoogleAuth bind:user/>
    </div>
  {/if}
</Navbar>

<main class="container mw-100 p-3">
  {#if showAddProject || showConfig}
    <div class="fix-width mx-auto">
      <ToggleBackButton bind:showAddProject bind:showConfig showBack={loadedProjects && loadedProjects.length > 0}/>
    </div>
  {/if}

  {#if loading || (!loadedProjects && !selectedProject)}
    <LoadingSpinner class="my-5"/>
  {:else if showAddProject}
    <ProjectImportList on:imported={projectImported}/>
  {:else if showConfig}
    <ProjectSettings bind:selectedProject={selectedProject.config} bind:projects on:changed={loadProjects}/>
  {:else if lang && Object.entries(selectedProject.dicts).length}
    <DictEditor project={selectedProject} {lang} {user}/>
  {:else}
    <Error
      title={`Could not load project: ${selectedProject.title}`}
      text={`Ensure that the link is correct or the tool has the correct credentials to access the resource`}/>
  {/if}
</main>
