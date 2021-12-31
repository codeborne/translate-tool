<script lang="ts">
  export let showAddProject: boolean
</script>

<button on:click={() => showAddProject = !showAddProject} class="btn btn-primary" type="button"
        title="Add a new project">
  <i class="fas fa-plus-circle"></i>
</button>
