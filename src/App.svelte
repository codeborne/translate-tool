<script lang="ts">
  import LangEditor from './components/LangEditor.svelte'
  import LangImporter from './components/LangImporter.svelte'
  import Navbar from './components/Navbar.svelte'
  import {onMount} from 'svelte'
  import type {Project} from './Project'
  import LoadingSpinner from "./components/LoadingSpinner.svelte";

  let showConfig = false
  let projects: Project[]
  let selectedProjectTitle = localStorage.getItem('selectedProject')
  let project: Project

  onMount(async () => {
    await tryLoadPreConfiguredProjects()
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
