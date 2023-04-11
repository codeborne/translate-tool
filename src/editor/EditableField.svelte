<script lang="ts">
  export let value: string
  export let changed: boolean
  export let isFirefox: boolean
</script>

{#if isFirefox}
  <div bind:textContent={value} class="text-input not-html" class:changed contenteditable></div>
{:else}
  <div bind:textContent={value} class="text-input not-html" class:changed contenteditable="plaintext-only"></div>
{/if}
