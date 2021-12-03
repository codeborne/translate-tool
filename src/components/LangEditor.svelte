<script lang="ts">
  import KeyValueTableRow from './KeyValueTableRow.svelte'
  import {cleanEmptyKeys} from './cleanEmptyKeys'
  import {getTotalFilledKeys, getTotalKeys} from './languageStats'
  import {areObjectsEqual, deepCopy} from '../utils'
  import KeyFilter from './KeyFilter.svelte'
  import Stats from './Stats.svelte'
  import LangSwitcher from './LangSwitcher.svelte'
  import ShowEmptyKeyFilter from './ShowEmptyKeyFilter.svelte'
  import LoadingSpinner from './LoadingSpinner.svelte'
  import type {Project} from '../Project'
  import jsonLoader from '../JsonLoader'

  export let project: Project
  export let selectedProjectTitle: string
  export let copied = true

  let langs: string[]
  let lang: string
  let dictKeyStats = {total: 0, filled: 0}
  let filter: string = ''
  let rawOutput: HTMLTextAreaElement
  let showEmptyKeys: boolean = false

  let error: string

  let defaultDict: Record<string, any>
  let selectedDict: Record<string, any>
  let uneditedDict: Record<string, any>

  $: if (selectedProjectTitle) loadProject()
  $: if (lang) loadDict()

  function initDefaultDict() {
    defaultDict = deepCopy(selectedDict)
    dictKeyStats.total = getTotalKeys(defaultDict)
    dictKeyStats.filled = getTotalFilledKeys(selectedDict)
  }

  function initUneditedDict() {
    uneditedDict = cleanEmptyKeys(deepCopy(selectedDict))
    copied = true
  }

  async function loadProject() {
    langs = await load('langs')
    lang = langs[0]
    await loadDict()
    initDefaultDict()
    copied = true
  }

  async function loadDict() {
    selectedDict = await load(lang)
    initUneditedDict()
  }

  function load(fileBaseName: string) {
    return jsonLoader.load(project, fileBaseName).catch(e => error = e.message)
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
    initUneditedDict()
  }
</script>

{#if error}
  <h6 class="text-center">{error}</h6>
{/if}

{#if !selectedDict || !defaultDict || !uneditedDict}
  <LoadingSpinner/>
{:else}
  <div class="d-flex justify-content-around gap-3">
    <LangSwitcher
      bind:changed={copied}
      bind:project
      bind:selectedProjectTitle
      bind:lang
      bind:langs
    />
    <Stats
      bind:stats={dictKeyStats}
      bind:indent={project.indent}
      defaultLang={langs[0]}
      totalLangs={langs.length} />
  </div>

  <div class="mt-3 outline p-3 d-flex flex-column align-items-center">
    <div class="d-flex flex-row justify-content-between w-100">
      <KeyFilter bind:filter />
      <ShowEmptyKeyFilter bind:showEmptyKeys />
      <div class="dl-flex justify-content-center align-items-center">
        <a class="btn btn-primary" href="#output">Jump to bottom</a>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
      <tr>
        <th class="fit" scope="col">Key</th>
        <th class="fit" scope="col">Selected ( {lang} )</th>
        <th class="fit" scope="col">Default ( {langs[0]} )</th>
      </tr>
      </thead>
      <tbody on:input={() => selectedDict = selectedDict}>
        <KeyValueTableRow {selectedDict} {defaultDict} {uneditedDict} {filter} bind:showEmptyKeys/>
      </tbody>
    </table>
    <button on:click={copy} class="btn btn-primary mt-3 mb-5 w-auto">Copy to clipboard <i class="fas fa-copy"></i></button>
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
{/if}

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
