<script lang="ts">
  import type {Dict} from '../common/Project'
  import Icon from '../components/Icon.svelte'
  import translator from './Translator'

  export let lang: string
  export let defaultLang: string
  export let dict: Dict
  export let defaultDict: Dict
  export let uneditedDict: Dict
  export let key: string

  let translation: string = ''
  let isTranslated: boolean = false

  translator.setCORS(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/proxy/`)

  async function handleTranslation() {
    if (!translation) await fetchTranslation()
    isTranslated = true
    dict[key] = translation
  }

  $: if (lang) resetTranslation()

  async function fetchTranslation() {
    await translator.translate(defaultDict[key].replace(/\./g, '7592302389753425'), { from: defaultLang, to: lang })
      .then((res: string) => {
        translation = res.replace(/7592302389753425/g, '.') as string ?? ''
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
