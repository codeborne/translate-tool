<script lang="ts">
  import {isHtml} from '../common/utils'

  export let defaultDict
  export let key
  export let fullKey
  let showHTML: boolean = false

  function containsHTML(html: string): boolean {
    return /(<([^>]+)>)/gi.test(html)
  }
</script>

<div>
  {#if !showHTML}
    <div contenteditable="false" bind:innerHTML={defaultDict[key]} class="overflow-auto align-self-center defaultLangText"></div>
  {:else}
    <div class="overflow-auto align-self-center defaultLangText">{defaultDict[key]}</div>
  {/if}
  {#if !isHtml(fullKey) && containsHTML(defaultDict[key])}
    <span class="text-danger"><i class="fa-solid fa-triangle-exclamation"></i> Contains HTML tags, but key does not end with <b>Html</b></span>
  {/if}
</div>


<div class="d-flex flex-column justify-content-start">
  <slot/>
  {#if isHtml(fullKey)}
    <button
      class="btn text-primary toggleShowHtmlBtn" on:click={() => showHTML = !showHTML}
      title={showHTML ? 'Show styled text' : 'Show HTML'}>
      {#if showHTML}
        <i class="fas fa-eye-slash"></i>
      {:else}
        <i class="fas fa-eye"></i>
      {/if}
    </button>
  {/if}
</div>

<style>
  .btn {
    padding: 0;
    margin-top: 0.5rem;
  }
</style>
