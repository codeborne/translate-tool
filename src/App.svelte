<script lang="ts">
  import LangSwitcher from './components/LangSwitcher.svelte'
  import LangEditor from './components/LangEditor.svelte'
  import langs from '../i18n/langs.json'

  let lang: string
</script>

<div class="container">
  <h1>Translation Tool</h1>
  <br>

  <LangSwitcher {langs} bind:lang/>

  <LangEditor {lang}/>
</div>
