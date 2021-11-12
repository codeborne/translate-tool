<script lang="ts">
  export let filter: string = ''

</script>

<span>
  <input class="form-control form-control-sm" bind:value={filter} placeholder="filter...">
  {filter}
</span>