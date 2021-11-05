<script lang="ts">
  import LangSwitcher from './components/LangSwitcher.svelte'
  import LangEditor from './components/LangEditor.svelte'
  import LangImporter from './LangImporter.svelte'
  import langs from '../i18n/langs.json'

  let displayLangImporter: boolean = true;

  let lang: string
</script>

<div class="container">
  <h1>Translation Tool</h1>
  <br>
  {#if !displayLangImporter}
    <button type="button" class="btn btn-primary" on:click={() => (displayLangImporter = true)}>
      Import config
    </button>

    <LangSwitcher {langs} bind:lang/>

    <LangEditor {lang}/>
  {:else}
    <LangImporter bind:isOpen={displayLangImporter}/>
  {/if}
</div>
