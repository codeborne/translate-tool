<script lang="ts">
  export let showAddProject: boolean
</script>

<button on:click={() => showAddProject = !showAddProject} class="btn btn-primary" type="button">
  <i class="fas {showAddProject ? 'fa-edit' : 'fa-plus-circle'}"></i>
</button>
