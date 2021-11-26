<script lang="ts">
  import KeyValueTableRow from './KeyValueTableRow.svelte'
  import {cleanEmptyKeys} from './cleanEmptyKeys'
  import {getTotalKeys, getTotalFilledKeys} from './languageStats'
  import {areObjectsEqual, getPathUrl, b64DecodeUnicode} from '../utils'
  import KeyFilter from "./KeyFilter.svelte";
  import Stats from "./Stats.svelte";
  import LangSwitcher from "./LangSwitcher.svelte";

  export let project: Record<string, any>
  export let selectedProject: string
  export let copied: boolean = true
  let lang: string = project.langs[0]
  let dictKeyStats: Record<string, number> = {'total': 0, 'filled': 0}
  let filter: string = ''
  let rawOutput: HTMLTextAreaElement

  let defaultDict: Record<string, any> // the dictionary being referenced as template
  let selectedDict: Record<string, any> // dictionary being edited
  let uneditedDict: Record<string, any> // original unchanged dictionary

  $: if (lang) loadChangedLang()

  function initOriginalDict() {
    uneditedDict = cleanEmptyKeys(JSON.parse(JSON.stringify(selectedDict)))
    copied = true
  }

  async function loadChangedLang() {
    selectedDict = await load(lang)
    initOriginalDict()
  }

  $: if(selectedProject) {
    updateProjectInEditor()
  }

  async function updateProjectInEditor() {
    lang = project.defaultLang
    await loadChangedLang()
    defaultDict = await load(project.defaultLang)
    dictKeyStats.total = getTotalKeys(defaultDict)
    dictKeyStats.filled = getTotalFilledKeys(selectedDict)
    copied = true
  }

  async function load(lang: string) {
    const isPublic: boolean = project.isPublic
    const dictUrl = `${getPathUrl(project.url)}/${lang}.json`
    if (isPublic) {
      return fetch(dictUrl).then(r => r.json())
    } else {
      const token = project.token
      const headers = new Headers({'Authorization': `token ${token}`});
      let newDict = await fetch(dictUrl, {method: 'GET', headers})
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error(response.text() as string)
          }})
        .catch((err) => console.log(err))
      return JSON.parse(b64DecodeUnicode(newDict.content))
    }
  }

  $: if (selectedDict) {
    selectedDict = cleanEmptyKeys(selectedDict)
    dictKeyStats.filled = getTotalFilledKeys(selectedDict)
    checkForChanges()
  }

  function checkForChanges() {
    copied = areObjectsEqual(cleanEmptyKeys(selectedDict), cleanEmptyKeys(uneditedDict))
  }

  function copy() {
    rawOutput.focus()
    rawOutput.select()
    document.execCommand('copy')
    initOriginalDict()
  }
</script>

<div class="d-flex justify-content-around gap-3">
  <LangSwitcher
    bind:changed={copied}
    bind:project
    bind:selectedProject
    bind:lang />
  <Stats
    bind:stats={dictKeyStats}
    bind:indent={project.indent}
    defaultLang={project.defaultLang}
    totalLangs={project.langs.length} />
</div>


<div class="mt-3 outline p-3 d-flex flex-column align-items-center">
  {#if selectedDict && defaultDict && uneditedDict}

    <div class="d-flex flex-row justify-content-between w-100">
      <KeyFilter bind:filter/>
      <div class="dl-flex justify-content-center align-items-center">
        <a class="btn btn-primary" href="#output">Jump to bottom</a>
      </div>
    </div>

    <table class="table table-striped">
      <thead>
      <tr>
        <th class="fit" scope="col">Key</th>
        <th class="fit" scope="col">Selected ( {lang} )</th>
        <th class="fit" scope="col">Default ( {project.defaultLang} )</th>
      </tr>
      </thead>
      <tbody on:input={() => selectedDict = selectedDict}>
        <KeyValueTableRow {selectedDict} {defaultDict} {uneditedDict} {filter}/>
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

  <textarea id="rawOutput" bind:this={rawOutput}
            class="form-control mb-3 bg-light"
            style={{width: '100%'}}
            rows="20">{JSON.stringify(selectedDict, null, project.indent)}</textarea>
</div>

<style>
  .outline {
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: white;
  }

  .fit {
    white-space: nowrap;
    width: 33%;
  }
</style>
