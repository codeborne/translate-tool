<script lang="ts">
  import type {Dict} from '../common/Project'
  import {setCORS, translate} from '../translator/translate'

  export let lang: string
  export let defaultLang: string
  export let dict: Dict
  export let defaultDict: Dict
  export let key: string

  // interface TranslationResponse {text: string}

  setCORS("https://secret-ocean-49799.herokuapp.com/") // TODO replace with more reliable/own proxy

  function handleTranslation() {
    translate(defaultDict[key], { from: defaultLang, to: lang })
      .then(res=> {
        dict[key] = res
      })
      .catch(err => {
        console.error(err);
      });
  }

</script>

{#if lang !== defaultLang}
  <button on:click={handleTranslation} class="btn float-end text-primary" title="Translate"><i class="fas fa-language"></i></button>
{/if}