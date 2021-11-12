<script lang="ts">
  import LangSwitcher from './components/LangSwitcher.svelte'
  import LangEditor from './components/LangEditor.svelte'
  import LangImporter from './components/LangImporter.svelte'
  import Navbar from "./components/Navbar.svelte";
  import Stats from "./components/Stats.svelte";

  let displayLangImporter: boolean = true;
  let url:string = ''
  let langs: Record<string, any> = {}
  let lang: string
  let saved:boolean = true
  let totalDict: number
  let filledDict: number

  let defaultLang: string
  let indent: number

  function getRootUrl(url) {
    const lastIndex: number = url.lastIndexOf('/')
    return url.substring(0, lastIndex)
  }

  // localStorage check
  if (localStorage.getItem('data')) {
    let data: Record<string, any> = JSON.parse(<string>localStorage.getItem('data'))
    langs = data.langs
    url = data.url
    displayLangImporter = false
  }
</script>

<Navbar bind:showConfigButton={displayLangImporter}/>
<main class="mt-5 mb-5">
  <div class="container outline p-3 bg-light">
    {#if !displayLangImporter}
      <div class="d-flex justify-content-around gap-3">
        <LangSwitcher bind:changed={saved} {langs} bind:lang />
        <Stats {totalDict} {filledDict} {indent} {defaultLang} totalLangs={langs.length} />
      </div>
      <LangEditor bind:indent bind:defaultLang bind:totalDict bind:filledDict bind:saved rootUrl={getRootUrl(url)} {lang}/>
    {:else}
      <LangImporter bind:url bind:langs bind:isOpen={displayLangImporter}/>
    {/if}
  </div>
</main>

<style>
  .outline {
    border: 1px solid lightgray;
    border-radius: 5px;
  }
</style>
