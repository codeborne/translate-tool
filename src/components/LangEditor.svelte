<script lang="ts">
  import KeyValueTableRow from './KeyValueTableRow.svelte'
  import {onMount} from 'svelte'
  import {cleanEmptyKeys} from './cleanEmptyKeys'
  import {getTotalDictCount, getFilledDictCount} from './languageStats'

  // todo make configurable
  let indent = 2
  let defaultLang: string = 'en'
  export let lang: string

  let defaultDict: Record<string, any>
  let dict: Record<string, any>
  let totalDict: number
  let filledDict: number

  let stats: Record<string, any> = {'total': 0, 'empty': 0}

  onMount(async () => {
    defaultDict = await load(defaultLang)
    totalDict = getTotalDictCount(defaultDict)
  })

  $: if (lang) (async function() {
    dict = await load(lang)
  })()

  function load(lang: string) {
    return fetch(`/i18n/${lang}.json`).then(r => r.json())
  }

  $: if (dict) {
    dict = cleanEmptyKeys(dict)
    filledDict = getFilledDictCount(dict)
  }

  let textarea: HTMLTextAreaElement
  function copy() {
    textarea.focus()
    textarea.select()
    document.execCommand('copy')
  }
</script>

<div class="mt-3">
  <h5>Currently editing: {lang}</h5>
  <h6>Total text: {totalDict}</h6>

  {#if filledDict === totalDict}
    <h6 style="color: green">All {filledDict} fields are filled!</h6>
    {:else if (filledDict > 0)}
    <h6 style="color: green">Filled text: {filledDict}</h6>
  {/if}

  {#if (totalDict - filledDict) > 0}
    <h6 style="color: darkred">Empty text: {totalDict - filledDict}</h6>
  {/if}


  {#if dict && defaultDict}
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Selected ( {lang} )</th>
        <th scope="col">Default ( {defaultLang} )</th>
      </tr>
      </thead>
      <tbody on:input={() => dict = dict}>
        <KeyValueTableRow {dict} {defaultDict}/>
      </tbody>
    </table>

    <button on:click={copy} class="btn btn-primary mt-3 mb-5 ">Copy to clipboard</button>

    <h3>RAW output:</h3>
    <textarea id="rawOutput" bind:this={textarea} style="width: 100%" rows="20">{JSON.stringify(dict, null, indent)}</textarea>
  {/if}
</div>
