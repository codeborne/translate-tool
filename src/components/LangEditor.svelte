<script lang="ts">
  import ObjectInput from "./ObjectInput.svelte";
  import LangSaveButton from "./LangSaveButton.svelte";

  export let lang: string

  // todo make configurable
  let config: string = "en"
  let configSet: Record<string, any>

  let dict: Record<string, any>
  $: if (lang) load(lang)

  function load(lang: string) {
    fetch(`/i18n/${lang}.json`).then(r => r.json()).then(r => dict = r)
  }
</script>

<div class="mt-3">
  <h5>Currently editing: {lang}</h5>

  <br>
  {#if dict != undefined}
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Selected ( {lang} )</th>
        <th scope="col">Default ( {config} )</th>
      </tr>
      </thead>
      <tbody>
      <ObjectInput dict={dict}/>
      </tbody>
    </table>

    <LangSaveButton/>

    <br>
    <h3>RAW output:</h3>
    <pre>
      {JSON.stringify(dict, null, 4)}
    </pre>
  {/if}

</div>

<style>
  pre {
    text-align: left;
    box-sizing: border-box;
    padding: 10px;
    background-color: ghostwhite;
    border: 1px solid lightgray;
  }
</style>