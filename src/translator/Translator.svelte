<script lang="ts">
  import type {Dict} from '../common/Project'
  import {setCORS, translate} from './translate'

  export let lang: string
  export let defaultLang: string
  export let dict: Dict
  export let defaultDict: Dict
  export let uneditedDict: Dict
  export let key: string

  let translation: string = ''
  let isTranslated: boolean = false

  setCORS(`${window.location.protocol}//${window.location.hostname}:8998/`)

  async function handleTranslation() {
    if (!translation) await fetchTranslation()
    isTranslated = true
    dict[key] = translation
  }

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

</script>

{#if lang !== defaultLang}
  {#if isTranslated}
    <button on:click={handleUndo} class="btn float-end text-primary" title="Undo translation"><i class="fas fa-undo"></i></button>
  {:else}
    <button on:click={handleTranslation} class="btn float-end text-primary" title="Translate"><i class="fas fa-language"></i></button>
  {/if}
{/if}