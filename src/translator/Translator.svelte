<script lang="ts">
  import type {Dict} from '../common/Project'
  import {setCORS, translate} from './translate'
  import Icon from '../components/Icon.svelte'

  export let lang: string
  export let defaultLang: string
  export let dict: Dict
  export let defaultDict: Dict
  export let uneditedDict: Dict
  export let key: string

  let translation: string = ''
  let isTranslated: boolean = false

  setCORS(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/proxy/`)

  async function handleTranslation() {
    if (!translation) await fetchTranslation()
    isTranslated = true
    dict[key] = translation
  }

  $: if (lang) resetTranslation()

  async function fetchTranslation() {
    await translate(defaultDict[key], { from: defaultLang, to: lang })
      .then(res=> {
        translation = res as string ?? ''
      })
      .catch(err => {
        console.error(err);
      });
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
    <button on:click={handleUndo} class="btn btn-icon text-primary p-2 me-n2" title="Undo translation"><Icon name="arrowBackUp"/></button>
  {:else}
    <button on:click={handleTranslation} class="btn btn-icon text-primary p-2 me-n2" title="Translate"><Icon name="language"/></button>
  {/if}
{/if}

<style>
  .btn {
    padding: 0
  }

  .me-n2 {
    margin-right: -0.5rem
  }
</style>
