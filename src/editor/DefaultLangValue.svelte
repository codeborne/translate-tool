<script lang="ts">
  import {containsHTMLTags, isHtml} from '../common/utils'
  import ContainsHTMLWarning from './ContainsHTMLWarning.svelte'
  import type {Dict} from '../common/Project'

  export let defaultDict: Dict
  export let key: string
  export let fullKey: string

  let showHTML = false
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


<div class="buttons d-flex flex-column justify-content-start gap-1">
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
  button {
    padding: 0;
  }

  .defaultLangText {
    white-space: pre-line;
  }
</style>
