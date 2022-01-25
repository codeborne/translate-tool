<script lang="ts">
  export let showAddProject: boolean
</script>

{#if !showAddProject}
  <button on:click={() => showAddProject = !showAddProject} class="btn btn-primary" type="button"
          title="Add a new project">
    <i class="me-2 fas fa-plus-circle"></i>Add a new project
  </button>
{/if}
