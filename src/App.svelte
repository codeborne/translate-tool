<script lang="ts">
  import LangSwitcher from './components/LangSwitcher.svelte'
  import LangEditor from './components/LangEditor.svelte'
  import LangImporter from './components/LangImporter.svelte'
  import Navbar from "./components/Navbar.svelte";

  let displayLangImporter: boolean = true;
  let url:string = ''
  let langs: Record<string, any> = {}
  let lang: string
  let saved:boolean = true

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
<div class="container">
  {#if !displayLangImporter}
    <LangSwitcher bind:saved {langs} bind:lang/>
    <LangEditor bind:saved rootUrl={getRootUrl(url)} {lang}/>
  {:else}
    <LangImporter bind:url bind:langs bind:isOpen={displayLangImporter}/>
  {/if}
</div>
