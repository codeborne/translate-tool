<script lang="ts">
  import KeyValueTableRow from './KeyValueTableRow.svelte'
  import {cleanEmptyKeys} from './cleanEmptyKeys'
  import {deepCopy} from '../common/utils'
  import type {Dict, LoadedProject} from '../common/Project'
  import DictClipboardOutput from './DictClipboardOutput.svelte'
  import Filter from './Filter'
  import FilterControls from './FilterControls.svelte'
  import {totalKeys} from './languageStats'

  export let project: LoadedProject
  export let lang: string

  let dict: Dict
  let uneditedDict: Dict
  let defaultLang: string
  let defaultDict: Dict

  $: initProject(project)
  $: initLang(lang)
  $: dict = cleanEmptyKeys(dict)

  function initProject(project: LoadedProject) {
    defaultLang = project.langs[0]
    defaultDict = project.dicts[defaultLang]
    if (dict) initLang(lang)
  }

  function initLang(lang: string) {
    dict = project.dicts[lang]
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

  <table class="table table-striped">
    <thead>
    <tr>
      <th class="fit" scope="col">Key</th>
      <th class="fit" scope="col">{lang} ({totalKeys(dict)})</th>
      <th class="fit" scope="col">{defaultLang} ({totalKeys(defaultDict)})</th>
    </tr>
    </thead>
    <tbody on:input={() => dict = dict}>
      <KeyValueTableRow {dict} {defaultDict} {uneditedDict} {filter}/>
    </tbody>
  </table>
</div>

<DictClipboardOutput {dict} indent={project.config.indent} on:copied={() => alert('Now paste it to you version control system')}/>

<style>
  .fit {
    white-space: nowrap;
    width: 33%;
  }
</style>
