<script lang="ts">
  export let showConfig: boolean
  export let showAddProject: boolean
  export let showBack = true
</script>

<div>
  {#if !showConfig && !showAddProject}
    <button id="backToImporterBtn" type="button" class="btn btn-secondary" on:click={() => showConfig = true}>
      <i class="fas fa-wrench me-1"></i> Project Settings
    </button>
  {/if}
  {#if (showConfig || showAddProject) && showBack}
    <button id="backToEditorBtn" type="button" class="btn btn-outline-secondary" on:click={() => showConfig = showAddProject = false}>
      <i class="fas fa-arrow-circle-left me-1"></i> Back to Editor
    </button>
  {/if}
</div>
