<script lang="ts">
  import LangEditor from './components/LangEditor.svelte'
  import LangImporter from './components/LangImporter.svelte'
  import Navbar from "./components/Navbar.svelte";

  let displayLangImporter: boolean = true;
  let saved:boolean = true
  let storage: any[] = []
  let selected: string
  let project: Record<string, any>

  // localStorage check data
  if (localStorage.getItem('config')) {
    storage = JSON.parse(localStorage.getItem('config') as string)
    if (storage.length == 0) {
      displayLangImporter = false
    }
  }

  // localStorage check current/last selected project
  if (localStorage.getItem('selected') && storage) {
    selected = localStorage.getItem('selected') as string
    project = storage.find(o => { return o.title === selected })
    displayLangImporter = false
  }

  $: if (selected) {
    project = storage.find(o => { return o.title === selected })
    localStorage.setItem('selected', selected)
  }


</script>

<Navbar bind:selected bind:storage bind:showConfigButton={displayLangImporter}/>
<main class="mt-5 mb-5 container">
    {#if !displayLangImporter}
      <h4 class="text-center mb-3">{project.title}</h4>
      <LangEditor
        bind:project
        bind:saved
        bind:selected />
    {:else}
      <LangImporter bind:storage bind:selected bind:isOpen={displayLangImporter}/>
    {/if}
</main>

<style>
  .outline {
    border: 1px solid lightgray;
    border-radius: 5px;
  }
</style>
