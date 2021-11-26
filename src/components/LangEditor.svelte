<script lang="ts">
  import KeyValueTableRow from './KeyValueTableRow.svelte'
  import {cleanEmptyKeys} from './cleanEmptyKeys'
  import {getTotalDictCount, getFilledDictCount} from './languageStats'
  import {areObjectsEqual, getRootUrl, b64DecodeUnicode} from '../utils'
  import KeyFilter from "./KeyFilter.svelte";
  import Stats from "./Stats.svelte";
  import LangSwitcher from "./LangSwitcher.svelte";

  export let project: Record<string, any>
  export let selectedProject: string
  export let saved: boolean = true
  let lang: string = project.langs[0]
  let stats: Record<string, number> = {'total': 0, 'filled': 0}
  let filter: string = ''

  let defaultDict: Record<string, any> // the dictionary being referenced as template
  let dict: Record<string, any> // dictionary being edited
  let originalDict: Record<string, any> // original unchanged dictionary

  $: if (lang) loadChangedLang()

  function initOriginalDict() {
    originalDict = cleanEmptyKeys(JSON.parse(JSON.stringify(dict)))
    saved = true
  }

  async function loadChangedLang() {
    dict = await load(lang)
    initOriginalDict()
  }

  $: if(project) {
    updateProjectInEditor()
  }

  async function updateProjectInEditor() {
    loadChangedLang() // sets dict and originalDict
    defaultDict = await load(project.defaultLang)
    stats.total = getTotalDictCount(defaultDict)
    stats.filled = getFilledDictCount(dict)
    saved = true
  }

  async function load(lang: string) {
    const localData: Record<string, any> = project
    const isPublic: boolean = localData.isPublic
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
    stats.filled = getFilledDictCount(dict)
    checkForChanges()
  }

  function checkForChanges() {
    saved = areObjectsEqual(cleanEmptyKeys(dict), cleanEmptyKeys(originalDict))
  }

  let textarea: HTMLTextAreaElement
  function copy() {
    textarea.focus()
    textarea.select()
    document.execCommand('copy')
    initOriginalDict()
  }
</script>

<div class="d-flex justify-content-around gap-3">
  <LangSwitcher
    bind:changed={saved}
    bind:project
    bind:selectedProject
    bind:lang />
  <Stats
    bind:stats
    bind:indent={project.indent}
    defaultLang={project.defaultLang}
    totalLangs={project.langs.length} />
</div>


<div class="mt-3 outline p-3 d-flex flex-column align-items-center">
  {#if dict && defaultDict && originalDict}

    <div class="d-flex flex-row justify-content-between w-100">
      <KeyFilter bind:filter/>
      <div class="dl-flex justify-content-center align-items-center">
        <a class="btn btn-primary" href="#output">Jump to bottom</a>
      </div>
    </div>

    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Key</th>
        <th scope="col">Selected ( {lang} )</th>
        <th scope="col">Default ( {project.defaultLang} )</th>
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
  <div class="d-flex justify-content-between mb-3">
    <h3 id="output">RAW output:</h3>
    <a class="btn btn-primary" href="#top">Jump to top</a>
  </div>

  <textarea id="rawOutput" bind:this={textarea}
            class="form-control mb-3 bg-light"
            style={{width: '100%'}}
            rows="20">{JSON.stringify(dict, null, project.indent)}</textarea>
</div>

<style>
  .outline {
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: white;
  }
</style>
