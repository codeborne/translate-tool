<script lang="ts">
  import KeyValueTableRow from './KeyValueTableRow.svelte'
  import {onMount} from 'svelte'
  import {cleanEmptyKeys} from './cleanEmptyKeys'
  import {getTotalDictCount, getFilledDictCount} from './languageStats'
  import {areObjectsEqual, getRootUrl, b64DecodeUnicode} from '../utils'
  import KeyFilter from "./KeyFilter.svelte";

  // todo make configurable
  export let indent = 2
  export let defaultLang: string = 'en'
  export let lang: string

  export let saved: boolean = true
  let filter: string = ''

  let defaultDict: Record<string, any>
  let dict: Record<string, any>
  let originalDict: Record<string, any>
  export let totalDict: number = 0
  export let filledDict: number = 0
  let stats: Record<string, any> = {'total': 0, 'empty': 0}

  $: if (lang) loadChangedLang()

  function initOriginalDict() {
    originalDict = cleanEmptyKeys(JSON.parse(JSON.stringify(dict)))
    saved = true
  }

  async function loadChangedLang() {
    dict = await load(lang)
    initOriginalDict()
  }

  async function load(lang: string) {
    const localData: Record<string, any> = JSON.parse(localStorage.getItem('data') as string)
    const isPublic:boolean = localData.isPublic
    const rootUrl = getRootUrl(localData.url)
    const link = `${rootUrl}/${lang}.json`
    if (isPublic) {
      return fetch(link).then(r => r.json())
    } else {
      const token = localData.token
      const headers = new Headers({'Authorization': `token ${token}`});
      let data = await fetch(link, {method: 'GET', headers})
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error(response.text() as string)
          }})
        .catch((err) => console.log(err))
      return JSON.parse(b64DecodeUnicode(data.content))
    }
  }

  $: if (dict) {
    dict = cleanEmptyKeys(dict)
    filledDict = getFilledDictCount(dict)
    checkForChanges()
  }

  function checkForChanges() {
    saved = areObjectsEqual(cleanEmptyKeys(dict), cleanEmptyKeys(originalDict))
  }

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
  }
</script>

<div class="mt-3 outline p-3 d-flex flex-column justify-content-center align-items-center">
  {#if dict && defaultDict && originalDict}
    <KeyFilter bind:filter/>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Key</th>
        <th scope="col">Selected ( {lang} )</th>
        <th scope="col">Default ( {defaultLang} )</th>
      </tr>
      </thead>
      <tbody on:input={() => dict = dict}>
        <KeyValueTableRow {dict} {defaultDict} {originalDict} {filter}/>
      </tbody>
    </table>

    <button on:click={copy} class="btn btn-primary mt-3 mb-5 w-auto">Copy to clipboard <i class="fas fa-copy"></i></button>
  {/if}
</div>
<div class="mt-3 outline p-3">
  <h3>RAW output:</h3>
  <textarea id="rawOutput" bind:this={textarea}
            class="form-control mb-3 bg-light"
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
