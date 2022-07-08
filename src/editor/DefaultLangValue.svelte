<script lang="ts">
  import {containsHTMLTags, isHtml} from '../common/utils'
  import ContainsHTMLWarning from './ContainsHTMLWarning.svelte'

  export let defaultDict
  export let key
  export let fullKey
  let showHTML: boolean = false

</script>

<div>
  {#if !showHTML}
    <div contenteditable="false" bind:innerHTML={defaultDict[key]} class="overflow-auto align-self-center defaultLangText"></div>
  {:else}
    <div class="overflow-auto align-self-center defaultLangText">{defaultDict[key]}</div>
  {/if}

  {#if !isHtml(fullKey) && containsHTMLTags(defaultDict[key])}
    <ContainsHTMLWarning/>
  {/if}
</div>


<div class="d-flex flex-column justify-content-start">
  <slot/>
  {#if isHtml(fullKey)}
    <button
      class="btn text-primary toggleShowHtmlBtn" on:click={() => showHTML = !showHTML}
      title={showHTML ? 'Show styled text' : 'Show HTML'}>
      <i class="fas fa-eye{showHTML ? '-slash' : ''}"></i>
    </button>
  {/if}
</div>

<style>
  .btn {
    padding: 0;
    margin-top: 0.5rem;
  }
</style>
