<script lang="ts">
  export let showAddProject: boolean
  import Icon from '.././components/Icon.svelte'
</script>

{#if !showAddProject}
  <button on:click={() => showAddProject = !showAddProject} class="btn btn-icon btn-secondary addNew" type="button"
          title="Add a new project">
    <Icon name="plus"/>Add a new project
  </button>
{/if}
