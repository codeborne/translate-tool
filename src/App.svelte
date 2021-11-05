<script lang="ts">
  import LangSwitcher from './components/LangSwitcher.svelte'
  import LangEditor from './components/LangEditor.svelte'
  import LangImporter from './components/LangImporter.svelte'
  import Navbar from "./components/Navbar.svelte";

  let displayLangImporter: boolean = true;
  let url = ''
  let langs: Record<string, any> = {}
  let lang: string

  function getRootUrl(url) {
    const lastIndex: number = url.lastIndexOf('/')
    return url.substring(0, lastIndex)
  }
</script>

<Navbar bind:showConfigButton={displayLangImporter}/>
<div class="container">
  {#if !displayLangImporter}
    <LangSwitcher {langs} bind:lang/>
    <LangEditor rootUrl={getRootUrl(url)} {lang}/>
  {:else}
    <LangImporter bind:url bind:langs bind:isOpen={displayLangImporter}/>
  {/if}
</div>
