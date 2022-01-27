<script lang="ts">
  import Icon from '.././components/Icon.svelte'

  export let showConfig: boolean
  export let showAddProject: boolean
  export let showBack = true
</script>

<div>
  {#if !showConfig && !showAddProject}
    <button id="backToImporterBtn" type="button" class="btn btn-icon btn-secondary" on:click={() => showConfig = true}>
      <Icon name="gear"/>Project Settings
    </button>
  {/if}
  {#if (showConfig || showAddProject) && showBack}
    <button id="backToEditorBtn" type="button" class="btn btn-icon btn-secondary" on:click={() => showConfig = showAddProject = false}>
      <Icon name="arrowLeft"/>Back to Editor
    </button>
  {/if}
</div>
