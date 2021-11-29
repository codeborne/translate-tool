<script lang="ts">
  import LangEditor from './components/LangEditor.svelte'
  import LangImporter from './components/LangImporter.svelte'
  import Navbar from "./components/Navbar.svelte";
  import {onMount} from 'svelte'

  let displayLangImporter: boolean = true;
  let projects: any[] = []
  let selectedProject: string
  let project: Record<string, any>
  let projectNames: string[] = []

  onMount(async () => {
    await getEnvProject()
    checkLocalStorage()
  })

  async function getEnvProject() {
    try {
      let fetched = await fetch(`projects.json`).then(r => r.json())
      projects = fetched
      selectedProject = projects[0].title
      localStorage.setItem('selectedProject', JSON.stringify(selectedProject))
    } catch (e) {
      console.warn('No environment file found, or it may have incorrect incorrect formatting, letting the user import project instead..')
    }
  }

  function checkLocalStorage() {
    if (localStorage.getItem('projects')) {
      projects = JSON.parse(localStorage.getItem('projects') as string)
      if (projects.length == 0) {
        displayLangImporter = false
      }
      if (!localStorage.getItem('selectedProject') && projects.length > 0) {
        localStorage.setItem('selectedProject', projects[0].title)
        selectedProject = projects[0]
      }
    }

    if (localStorage.getItem('selectedProject') && projects) {
      selectedProject = localStorage.getItem('selectedProject') as string
      project = projects.find(o => { return o.title === selectedProject })
      displayLangImporter = false
    }
  }

  function getProjectTitles() {
    projectNames = []
    for (let p of projects) projectNames.push(p.title)
  }


  $: if (selectedProject) {
    project = projects.find(o => { return o.title === selectedProject })
    localStorage.setItem('selectedProject', selectedProject)
    getProjectTitles()
  }

</script>

<Navbar bind:selectedProject bind:projectNames bind:showConfigButton={displayLangImporter}/>
<main class="mt-5 mb-5 container">
    {#if !displayLangImporter}
      <h4 class="text-center mb-3">{project.title}</h4>
      <LangEditor
        bind:project
        bind:selectedProject />
    {:else}
      <LangImporter bind:projects bind:selectedProject bind:isOpen={displayLangImporter}/>
    {/if}
</main>

<style>
  .outline {
    border: 1px solid lightgray;
    border-radius: 5px;
  }
</style>
