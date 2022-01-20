<script lang="ts">
  export let project
  export let defaultBranch

  function open() {
    window.open('https://example.com', '_blank')
  }
</script>

<button on:click={open} class="btn btn-primary w-auto">
  <i class="fas fa-link"></i> Source
</button>