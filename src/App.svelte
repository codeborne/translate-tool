<script lang="ts">
  import LangEditor from './components/LangEditor.svelte'
  import LangImporter from './components/LangImporter.svelte'
  import Navbar from "./components/Navbar.svelte";

  let displayLangImporter: boolean = true;
  let saved:boolean = true
  let projects: any[] = []
  let selectedProject: string
  let project: Record<string, any>

  // localStorage check data
  if (localStorage.getItem('projects')) {
    projects = JSON.parse(localStorage.getItem('projects') as string)
    if (projects.length == 0) {
      displayLangImporter = false
    }
  }

  // localStorage check current/last selectedProject project
  if (localStorage.getItem('selectedProject') && projects) {
    selectedProject = localStorage.getItem('selectedProject') as string
    project = projects.find(o => { return o.title === selectedProject })
    displayLangImporter = false
  }

  $: if (selectedProject) {
    project = projects.find(o => { return o.title === selectedProject })
    localStorage.setItem('selectedProject', selectedProject)
  }


</script>

<Navbar bind:selectedProject bind:projects bind:showConfigButton={displayLangImporter}/>
<main class="mt-5 mb-5 container">
    {#if !displayLangImporter}
      <h4 class="text-center mb-3">{project.title}</h4>
      <LangEditor
        bind:project
        bind:saved
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
