<script lang="ts">

  export let title: string
  export let selectedProject: string
  export let isImporterOpen: boolean

  function setProject() {
    selectedProject = title
    isImporterOpen = false
  }

</script>

<button on:click={setProject} class="btn btn-sm">
  {title}
</button>