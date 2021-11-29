<script lang="ts">
  export let title: string
  export let selectedProjectTitle: string
</script>

<button class="btn btn-sm" class:selected={title === selectedProjectTitle} on:click={() => selectedProjectTitle = title}>
  {title}
</button>

<style>
  .selected {
    border-bottom: 3px solid dodgerblue;
  }
</style>