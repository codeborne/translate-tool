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
  import BranchLoadedFrom from './BranchLoadedFrom.svelte'
  import BitBucketOutput from '../bitbucket/BitBucketOutput.svelte'
  import {BitBucketClient} from '../bitbucket/BitBucketClient'
  import ProjectSourceButton from './ProjectSourceButton.svelte'
  import Icon from '../components/Icon.svelte'
  import type GoogleProfile from '../common/GoogleAuth.svelte'


  export let project: LoadedProject
  export let lang: string
  export let user: GoogleProfile

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

  function onSaved() {
    defaultBranch = project.config.branch ?? 'translations'
    updateUneditedDict()
  }

  window.onbeforeunload = () => {
    if (totalDifferentValues(uneditedDict, dict) > 0) return ''
  }

  let filter = new Filter()
</script>

<BranchLoadedFrom config={project.config} bind:defaultBranch/>

<div class="card shadow d-flex flex-column align-items-center">
  <div class="d-flex flex-row justify-content-between w-100 px-3 px-lg-4 pt-3 pt-lg-4">
    <FilterControls bind:filter/>
    <div class="d-flex justify-content-center align-items-center">
      <a class="btn btn-secondary btn-icon btn-sm" href="#output"><Icon name="arrowDown"/> Jump to bottom</a>
    </div>
  </div>

  <table class="mt-1 w-100">
    <thead class="border-bottom">
      <tr>
        <th class="w-25">Key</th>
        <th>{lang} ({totalKeys(dict)})</th>
        <th>{defaultLang} ({totalKeys(defaultDict)})</th>
      </tr>
    </thead>
    <tbody on:focusout={onChange}>
      <KeyValueTableRow {lang} {dict} {defaultDict} {uneditedDict} {filter} {defaultLang}/>
    </tbody>
  </table>
</div>

<div id="output" class="mt-3 card shadow p-3">
  <DictClipboardOutput {dict} {lang} indent={project.config.indent} on:copied={onCopied}>
    {#if project.config.url.includes(GitHubClient.host) && project.config.token}
      <GitHubOutput {user} {dict} {lang} config={project.config} on:saved={onSaved}/>
    {:else if project.config.url.includes(BitBucketClient.host) && project.config.token}
      <BitBucketOutput {user} {dict} {lang} config={project.config} on:saved={onSaved}/>
    {/if}
    <ProjectSourceButton project={project.config} {defaultBranch} {lang}/>
    <ChangesCounter slot="counter" {dict} {uneditedDict}/>
  </DictClipboardOutput>
</div>
