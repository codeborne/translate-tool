<script lang="ts">

  export let title: string
  export let selectedProject: string
  export let isImporterOpen: boolean

  function setProject() {
    selectedProject = title
    isImporterOpen = false
  }

</script>

<button on:click={setProject} class="btn btn-sm" class:selected={title === selectedProject}>
  {title}
</button>

<style>
  .selected {
    border-bottom: 3px solid dodgerblue;
  }
</style>