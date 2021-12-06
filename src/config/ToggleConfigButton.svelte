<script lang="ts">
  export let showConfig: boolean
  export let showBack = true
</script>

<div>
  {#if !showConfig}
    <button id="backToImporterBtn" type="button" class="btn btn-outline-secondary" on:click={() => showConfig = true}>
      Project Settings <i class="fas fa-wrench"></i>
    </button>
  {/if}
  {#if showConfig && showBack}
    <button id="backToEditorBtn" type="button" class="btn btn-outline-secondary" on:click={() => showConfig = false}>
      Back to Editor <i class="fas fa-arrow-circle-right"></i>
    </button>
  {/if}
</div>
