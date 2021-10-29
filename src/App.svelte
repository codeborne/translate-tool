<script lang="ts">
  import LangSwitcher from "./components/LangSwitcher.svelte";
  import LangEditor from "./components/LangEditor.svelte";

  let lang: string
</script>

<div class="container">
  <h1>Translation Tool</h1>
  <br>

  <LangSwitcher bind:lang/>

  <LangEditor {lang}/>
</div>
