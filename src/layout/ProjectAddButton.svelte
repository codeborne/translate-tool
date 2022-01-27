<script lang="ts">
  export let showAddProject: boolean
  import Icon from '.././components/Icon.svelte'
</script>

{#if !showAddProject}
  <button on:click={() => showAddProject = !showAddProject} class="btn btn-icon btn-secondary" type="button"
          title="Add a new project">
    <Icon name="plus" size="24"/>
    <span>Add a new project</span>
  </button>
{/if}
