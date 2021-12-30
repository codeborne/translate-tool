<script lang="ts">

  import {getValue} from '../common/utils'
  import type {Dict} from '../common/Project'

  export let lang: string
  export let key: string
  export let dict: Dict
  export let uneditedDict: Dict


  const isHtml = (suffix: string) => suffix.endsWith("Html")

  $: dict[key] = dict[key] ?? ''
  $: uneditedDict[key] = uneditedDict[key] ?? ''

</script>

{#if !isHtml(key)}
  <textarea {lang} bind:value={dict[key]} class="form-control"
            class:changed={(getValue(key, dict) ?? '') !== (getValue(key, uneditedDict) ?? '')}
            class:dynamic-textarea={dict && dict[key] && getValue(key, dict).length > 50}></textarea>
{:else}
  <div bind:innerHTML={dict[key]} class="form-control"
       contenteditable="true"
       class:changed={(getValue(key, dict) ?? '') !== (getValue(key, uneditedDict) ?? '')}
       class:dynamic-textarea={dict && dict[key] && getValue(key, dict).length > 50}>
  </div>
{/if}

<style>

  textarea {
    width: 100%;
    height: 0;
    max-height: 0;
    transition: 0.3s;
    overflow: hidden;
  }

  .changed {
    background-color: aliceblue;
    border-color: lightblue;
  }

  .dynamic-textarea:focus {
    max-height: 30em;
    height: 8em;
    overflow-y: auto;
  }
</style>