<script lang="ts">
  import LangSwitcher from "./components/LangSwitcher.svelte";
  import LangReader from "./components/LangReader.svelte";

  let lang: string
</script>

<div class="container text-center">
  Hello from Translate tool
  <br>

  <LangSwitcher bind:lang/>

  XX:{lang}

  <LangReader {lang}/>
</div>
