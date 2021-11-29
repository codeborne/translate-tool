<script lang="ts">
  import LangEditor from './components/LangEditor.svelte'
  import LangImporter from './components/LangImporter.svelte'
  import Navbar from './components/Navbar.svelte'
  import {onMount} from 'svelte'
  import type {Project} from './Project'

  let displayLangImporter = false
  let projects: Project[]
  let selectedProjectTitle = localStorage.getItem('selectedProject')
  let project: Project

  onMount(async () => {
    await tryLoadPreConfiguredProjects()
    if (!projects) tryInitFromLocalStorage()
    if (!projects) return displayLangImporter = true
  })

  async function tryLoadPreConfiguredProjects() {
    try {
      projects = await fetch('projects.json').then(r => r.json())
    } catch (e) {
      console.warn('No environment file found, or it may have incorrect incorrect formatting. Letting the user import a project instead..')
    }
  }

  function tryInitFromLocalStorage() {
    projects = JSON.parse(localStorage.getItem('projects') ?? 'null')
  }

  $: if (selectedProjectTitle && projects?.length) {
    project = projects.find(p => p.title === selectedProjectTitle) ?? projects[0]
    selectedProjectTitle = project.title
    localStorage.setItem('selectedProject', selectedProjectTitle)
  }
</script>

{#if projects}
  <Navbar projectTitles={projects.map(p => p.title)} bind:selectedProjectTitle bind:showConfigButton={displayLangImporter}/>
  <main class="mt-5 mb-5 container">
    {#if displayLangImporter}
      <LangImporter bind:projects bind:selectedProjectTitle bind:isOpen={displayLangImporter}/>
    {:else}
      <LangEditor bind:project bind:selectedProjectTitle/>
    {/if}
  </main>
{:else}
  <div class="spinner"></div>
{/if}

<style>
  .outline {
    border: 1px solid lightgray;
    border-radius: 5px;
  }
</style>
