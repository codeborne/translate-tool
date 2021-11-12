<script lang="ts">
  import KeyValueTableRow from './KeyValueTableRow.svelte'
  import {onMount} from 'svelte'
  import {cleanEmptyKeys} from './cleanEmptyKeys'
  import {getTotalDictCount, getFilledDictCount} from './languageStats'

  // todo make configurable
  export let indent = 2
  export let defaultLang: string = 'en'
  export let lang: string
  export let rootUrl: string

  export let saved: boolean = true
  let isLoading: boolean = true

  let defaultDict: Record<string, any>
  let dict: Record<string, any>
  let originalDict: Record<string, any>
  export let totalDict: number = 0
  export let filledDict: number = 0
  let stats: Record<string, any> = {'total': 0, 'empty': 0}

  $: if (lang) loadChangedLang()

  function initOriginalDict() {
    originalDict = JSON.parse(JSON.stringify(dict))
  }

  async function loadChangedLang() {
    dict = await load(lang)
    initOriginalDict()
  }

  function load(lang: string) {
    return fetch(`${rootUrl}/${lang}.json`).then(r => r.json())
  }

  $: if (dict) {
    dict = cleanEmptyKeys(dict)
    filledDict = getFilledDictCount(dict)
    if (isLoading) isLoading = false
    checkForChanges()
  }

  function checkForChanges() {
    saved = dict == originalDict
    console.log(saved.toString())
  }

  $: if (lang) isLoading = true

  onMount(async () => {
    defaultDict = await load(defaultLang)
    totalDict = getTotalDictCount(defaultDict)
  })

  let textarea: HTMLTextAreaElement
  function copy() {
    textarea.focus()
    textarea.select()
    document.execCommand('copy')
    initOriginalDict()
    console.log(originalDict)
  }
</script>

<div class="mt-3 outline p-3 d-flex flex-column justify-content-center align-items-center">
  {#if dict && defaultDict && originalDict}
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Selected ( {lang} )</th>
        <th scope="col">Default ( {defaultLang} )</th>
      </tr>
      </thead>
      <tbody on:input={() => dict = dict}>
        <KeyValueTableRow {dict} {defaultDict} {originalDict} on:change={saved = false} />
      </tbody>
    </table>

    <button on:click={copy} class="btn btn-primary mt-3 mb-5 w-auto">Copy to clipboard <i class="fas fa-copy"></i></button>
  {/if}
</div>
<div class="mt-3 outline p-3">
  <h3>RAW output:</h3>
  <textarea id="rawOutput" bind:this={textarea}
            class="form-control mb-3"
            style={{width: '100%'}}
            rows="20">{JSON.stringify(dict, null, indent)}</textarea>
</div>

<style>
  .outline {
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: white;
  }
</style>
