<script lang="ts">
  import Icon from '../components/Icon.svelte'

  export let showConfig: boolean
  export let showAddProject: boolean
  export let showBack = true
</script>

  {#if !showConfig && !showAddProject}
    <button id="backToImporterBtn" type="button" class="btn btn-icon btn-secondary" on:click={() => showConfig = true}>
      <Icon name="gear"/>Project Settings
    </button>
  {/if}