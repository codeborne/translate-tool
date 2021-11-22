<script lang="ts">

  export let title: string
  export let selected: string
  export let isImporterOpen: boolean

  function setProject() {
    selected = title
    isImporterOpen = false
  }

</script>

<button on:click={setProject} class="btn btn-sm">
  {title}
</button>