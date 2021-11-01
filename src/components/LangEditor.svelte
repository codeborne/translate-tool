<script lang="ts">
  import KeyValueTableRow from './KeyValueTableRow.svelte';
  import {onMount} from 'svelte';

  // todo make configurable
  let defaultLang: string = 'en'
  export let lang: string

  let defaultDict: Record<string, any>
  let dict: Record<string, any>

  onMount(async () => {
    defaultDict = await load(defaultLang)
  })

  $: if (lang) (async function() {
    dict = await load(lang)
  })()

  function save() {
    console.log('saved', dict)
  }

  function load(lang: string) {
    return fetch(`/i18n/${lang}.json`).then(r => r.json())
  }
</script>

<div class="mt-3">
  <h5>Currently editing: {lang}</h5>

  {#if dict && defaultDict}
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Selected ( {lang} )</th>
        <th scope="col">Default ( {defaultLang} )</th>
      </tr>
      </thead>
      <tbody>
        <KeyValueTableRow {dict} {defaultDict}/>
      </tbody>
    </table>

    <button on:click={save} class="btn btn-primary mt-3 mb-5 ">Save Changes</button>

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