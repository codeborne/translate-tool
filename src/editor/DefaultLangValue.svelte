<script lang="ts">
  import {isHtml} from '../common/utils'

  export let defaultDict
  export let key
  export let fullKey
  let showHTML: boolean = false
</script>


{#if !showHTML}
  <div contenteditable="false" bind:innerHTML={defaultDict[key]} class="overflow-auto"></div>
{:else}
  <span class="overflow-auto">{defaultDict[key]}</span>
{/if}

<div class="row ms-1">
  <slot/>
  {#if isHtml(fullKey)}
    <button
      class="btn float-end text-primary" on:click={() => showHTML = !showHTML}
      title={showHTML ? 'Show styled text' : 'Show HTML'}>
      <i class="fas fa-code"></i>
    </button>
  {/if}
</div>
