<script lang="ts">
  import type {Dict} from '../common/Project'
  import Icon from '../components/Icon.svelte'
  import googleTranslate from './GoogleTranslate'

  export let lang: string
  export let defaultLang: string
  export let dict: Dict
  export let defaultDict: Dict
  export let uneditedDict: Dict
  export let key: string

  let translation: string = ''
  let isTranslated: boolean = false

  googleTranslate.setCORS(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/proxy/`)

  async function handleTranslation() {
    if (!translation) await fetchTranslation()
    isTranslated = true
    dict[key] = translation
  }

  $: if (lang) resetTranslation()

  async function fetchTranslation() {
    const periodSubstitution = '7592302389753425' // Google Translate stops translating at first period otherwise
    const res = await googleTranslate.translate(defaultDict[key].replace(/\./g, periodSubstitution), { from: defaultLang, to: lang })
    translation = res.replace(new RegExp(periodSubstitution, 'g'), '.') ?? ''
  }

  function handleUndo() {
    dict[key] = uneditedDict[key]
    isTranslated = false
  }

  function resetTranslation() {
    translation = ''
    isTranslated = false
  }
</script>

{#if lang !== defaultLang}
  {#if isTranslated}
    <button on:click={handleUndo} class="btn translate-undo btn-icon text-primary p-2 btn-icon-only" title="Undo translation"><Icon name="arrowBackUp"/></button>
  {:else}
    <button on:click={handleTranslation} class="btn translate btn-icon text-primary p-2 btn-icon-only" title="Translate"><Icon name="language"/></button>
  {/if}
{/if}

<style>
  .btn {
    padding: 0
  }
</style>
