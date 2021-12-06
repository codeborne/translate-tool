<script lang="ts">
  import LangEditor from './components/LangEditor.svelte'
  import LangImporter from './components/LangImporter.svelte'
  import Navbar from './components/Navbar.svelte'
  import {onMount} from 'svelte'
  import type {Project} from './Project'
  import LoadingSpinner from "./components/LoadingSpinner.svelte";
  import type {ProjectDictionary} from './ProjectDictionary'
  import JsonLoader from './JsonLoader'

  let showConfig = false
  let projects: Project[]
  let selectedProjectTitle = localStorage.getItem('selectedProject')
  let project: Project
  let projectDictionaries: ProjectDictionary[] = []

  onMount(async () => {
    await tryLoadPreConfiguredProjects()
    await tryLoadAllProjectLanguages()
    if (!projects) tryInitFromLocalStorage()
    if (projects && !selectedProjectTitle) selectedProjectTitle = projects[0].title
    if (!projects) {
      projects = []
      return showConfig = true
    }
  })

  async function tryLoadPreConfiguredProjects() {
      projects = await fetch('projects.json').then(r => r.json()).catch(e => console.warn('No deployment argument file found.'))
  }

  async function tryLoadAllProjectLanguages() {
    for (let i = 0; i < projects.length; i++) {

      let projInfo: ProjectDictionary = {
        title: projects[i].title,
        dictionaries: []
      }

      let projectLangs: string[]= []
      try {
      projectLangs = await JsonLoader.load(projects[i], "langs") ?? undefined
      } catch (e: Error) { console.warn('Could not load url, skipping.. ' + e.message) }
      projectLangs && projectDictionaries.push(projInfo)
      projectLangs && projectLangs.forEach((lang) => projectDictionaries[i].dictionaries.push({lang, dict: {}}))
    }
    await tryLoadAllProjectDictionaries()
  }

  async function tryLoadAllProjectDictionaries() {
    for (let i = 0; i < projectDictionaries.length; i++) {
      for (let dicts of projectDictionaries[i].dictionaries) {
        dicts.dict = await JsonLoader.load(projects[i], dicts.lang)
      }
    }
    console.log(projectDictionaries)
  }

  function tryInitFromLocalStorage() {
    projects = JSON.parse(localStorage.getItem('projects') ?? 'null')
  }

  $: if (selectedProjectTitle && projects?.length) {
    project = projects.find(p => p.title === selectedProjectTitle) ?? projects[0]
    selectedProjectTitle = project.title
    localStorage.setItem('selectedProject', selectedProjectTitle)
  }

  function showUnhandledError(e: PromiseRejectionEvent) {
    console.error(e.reason)
    alert('Error, please reload the page:\n\n' + e.reason?.message ?? '')
  }
</script>

<svelte:window on:unhandledrejection={showUnhandledError}/>

{#if projects}
  <Navbar projectTitles={projects.map(p => p.title)} bind:selectedProjectTitle bind:showConfig/>
  <main class="mt-5 mb-5 container">
    {#if showConfig}
      <LangImporter bind:projects bind:selectedProjectTitle bind:isOpen={showConfig}/>
    {:else}
      <LangEditor bind:project bind:selectedProjectTitle/>
    {/if}
  </main>
{:else}
  <LoadingSpinner/>
{/if}

<style>
  .outline {
    border: 1px solid lightgray;
    border-radius: 5px;
  }
</style>
