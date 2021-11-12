<script lang="ts">
  let search: string = ''

</script>

<span>
  <input class="form-control form-control-sm" bind:value={search} placeholder="filter...">
  {search}
</span>