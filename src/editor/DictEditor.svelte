<script lang="ts">
  import KeyValueTableRow from './KeyValueTableRow.svelte'
  import {deepCopy} from '../common/utils'
  import type {Dict, LoadedProject} from '../common/Project'
  import DictClipboardOutput from './DictClipboardOutput.svelte'
  import Filter from './Filter'
  import FilterControls from './FilterControls.svelte'
  import {totalDifferentValues, totalKeys} from './languageStats'
  import GitHubOutput from '../github/GitHubOutput.svelte'
  import {GitHubClient} from '../github/GitHubClient'
  import ChangesCounter from './ChangesCounter.svelte'
  import type {GoogleAuthUser} from '../common/GoogleAuthUser'
  import BranchLoadedFrom from './BranchLoadedFrom.svelte'
  import BitBucketOutput from '../bitbucket/BitBucketOutput.svelte'
  import {BitBucketClient} from '../bitbucket/BitBucketClient'
  import ProjectSourceButton from './ProjectSourceButton.svelte'


  export let project: LoadedProject
  export let lang: string
  export let user: GoogleAuthUser

  let dict: Dict
  let uneditedDict: Dict
  let defaultLang: string
  let defaultDict: Dict
  let defaultBranch: string = project.config.branch ?? 'translations'

  $: initProject(project)
  $: initLang(lang)

  function initProject(project: LoadedProject) {
    defaultLang = project.langs[0]
    defaultDict = project.dicts[defaultLang]
    if (dict) initLang(lang)
  }

  function initLang(lang: string) {
    dict = project.dicts[lang] ?? {}
    uneditedDict = deepCopy(dict)
  }

  function onChange() {
    dict = dict
    if (dict === defaultDict) defaultDict = defaultDict
  }

  function onCopied() {
    alert('Results have been copied')
    updateUneditedDict()
  }

  function updateUneditedDict() {
    uneditedDict = deepCopy(dict)
    if (lang == defaultLang) defaultDict = deepCopy(dict)
  }

  window.onbeforeunload = () => {
    if (totalDifferentValues(uneditedDict, dict) > 0) return ''
  }

  let filter = new Filter()
</script>

<BranchLoadedFrom config={project.config} bind:defaultBranch/>

<div class="mt-3 card p-3 d-flex flex-column align-items-center">
  <div class="d-flex flex-row justify-content-between w-100">
    <FilterControls bind:filter/>
    <div class="dl-flex justify-content-center align-items-center">
      <a class="btn btn-primary" href="#output"><i class="fas fa-arrow-down"></i> Jump to bottom</a>
    </div>
  </div>

  <table class="mt-3 w-100">
    <thead class="border-bottom">
      <tr>
        <th>Key</th>
        <th class="w-50">{lang} ({totalKeys(dict)})</th>
        <th>{defaultLang} ({totalKeys(defaultDict)})</th>
      </tr>
    </thead>
    <tbody on:focusout={onChange}>
      <KeyValueTableRow {lang} {dict} {defaultDict} {uneditedDict} {filter} {defaultLang}/>
    </tbody>
  </table>
</div>

<div id="output" class="mt-3 card p-3">
  <DictClipboardOutput {dict} {lang} indent={project.config.indent} on:copied={onCopied}>
    {#if project.config.url.includes(GitHubClient.host) && project.config.token}
      <GitHubOutput {user} {dict} {lang} config={project.config} on:saved={updateUneditedDict}/>
    {:else if project.config.url.includes(BitBucketClient.host) && project.config.token}
      <BitBucketOutput {user} {dict} {lang} config={project.config} on:saved={updateUneditedDict}/>
    {/if}
    <ProjectSourceButton project={project.config} {defaultBranch} {lang}/>
    <ChangesCounter slot="counter" {dict} {uneditedDict}/>
  </DictClipboardOutput>
</div>

<style>
  th {
    padding-bottom: 0.5em;
  }

  tbody :global(td) {
    padding: 0.2em 0;
  }

  table {
    table-layout: fixed
  }

  th:last-of-type, tbody :global(td:last-of-type) {
    padding-left: 0.75em;
  }

  tbody :global(tr:hover) {
    background: #eee;
  }
</style>
