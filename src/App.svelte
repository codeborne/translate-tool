<script lang="ts">
  import LangSwitcher from './components/LangSwitcher.svelte'
  import LangEditor from './components/LangEditor.svelte'
  import LangImporter from './components/LangImporter.svelte'
  import langs from '../i18n/langs.json'
  import Navbar from "./components/Navbar.svelte";

  let displayLangImporter: boolean = true;

  let lang: string
</script>

<Navbar bind:showConfigButton={displayLangImporter}/>
<div class="container">
  {#if !displayLangImporter}
    <LangSwitcher {langs} bind:lang/>

    <LangEditor {lang}/>
  {:else}
    <LangImporter bind:isOpen={displayLangImporter}/>
  {/if}
</div>
