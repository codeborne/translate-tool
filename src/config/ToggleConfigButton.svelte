<script lang="ts">
  export let showConfig: boolean
  export let showBack = true
</script>

<div>
  {#if !showConfig}
    <button id="backToImporterBtn" type="button" class="btn btn-outline-secondary" on:click={() => showConfig = true}>
      <i class="fas fa-wrench me-1"></i> Project Settings
    </button>
  {/if}
  {#if showConfig && showBack}
    <button id="backToEditorBtn" type="button" class="btn btn-outline-secondary" on:click={() => showConfig = false}>
      <i class="fas fa-arrow-circle-right me-1"></i> Back to Editor
    </button>
  {/if}
</div>
