<script lang="ts">
  import KeyValueTableRow from './KeyValueTableRow.svelte'
  import {cleanEmptyKeys} from './cleanEmptyKeys'
  import {deepCopy} from '../common/utils'
  import type {Dict, LoadedProject} from '../common/Project'
  import DictClipboardOutput from './DictClipboardOutput.svelte'
  import Filter from './Filter'
  import FilterControls from './FilterControls.svelte'
  import {totalKeys} from './languageStats'
  import GitHubOutput from '../github/GitHubOutput.svelte'
  import {GitHubClient} from '../github/GitHubClient'

  export let project: LoadedProject
  export let lang: string

  let dict: Dict
  let uneditedDict: Dict
  let defaultLang: string
  let defaultDict: Dict

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

  let filter = new Filter()
</script>

<div class="mt-3 card p-3 d-flex flex-column align-items-center">
  <div class="d-flex flex-row justify-content-between w-100">
    <FilterControls bind:filter/>
    <div class="dl-flex justify-content-center align-items-center">
      <a class="btn btn-primary" href="#output">Jump to bottom</a>
    </div>
  </div>

  <table class="w-100 mt-3">
    <thead class="border-bottom">
      <tr>
        <th>Key</th>
        <th>{lang} ({totalKeys(dict)})</th>
        <th>{defaultLang} ({totalKeys(defaultDict)})</th>
      </tr>
    </thead>
    <tbody on:input={() => dict = dict}>
      <KeyValueTableRow {lang} {dict} {defaultDict} {uneditedDict} {filter}/>
    </tbody>
  </table>
</div>

<div id="output" class="mt-3 card p-3">
  <DictClipboardOutput {dict} {lang} indent={project.config.indent} on:copied={() => alert('Now paste it to you version control system')}>
    {#if project.config.url.includes(GitHubClient.host) && project.config.token}
      <GitHubOutput {dict} {lang} config={project.config}/>
    {/if}
  </DictClipboardOutput>
</div>

<style>
  th {
    width: 33%;
    padding-bottom: 0.5em;
  }

  tbody :global(td) {
    padding: 0.2em 0;
  }

  th:last-of-type, tbody :global(td:last-of-type) {
    padding-left: 0.75em;
  }

  tbody :global(tr:hover) {
    background: #eee;
  }
</style>
