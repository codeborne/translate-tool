<script lang="ts">
  import LangSwitcher from "./components/LangSwitcher.svelte";
  import LangEditor from "./components/LangEditor.svelte";

  let lang: string
</script>

<div class="container text-center">
  Hello from Translate tool
  <br>

  <LangSwitcher bind:lang/>

  XX:{lang}

  <LangEditor {lang}/>
</div>
