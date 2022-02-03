<script lang="ts">
  export let showAddProject: boolean
  export let showConfig: boolean
  import Icon from '.././components/Icon.svelte'
</script>

{#if !showConfig && !showAddProject}
  <button on:click={() => showAddProject = !showAddProject} class="btn btn-icon btn-secondary" type="button"
          title="Add a new project">
    <Icon name="plus"/>Add a new project
  </button>
{/if}
