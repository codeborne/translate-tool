<script lang="ts">

  import type Filter from './Filter'

  export let filter: Filter
</script>

<div class="d-flex align-items-center">
  <input class="form-control" bind:value={filter.search} placeholder="Filter...">

  <div class="ms-3 ms-lg-4 form-check form-switch">
    <input class="form-check-input" title="Show only empty" type="checkbox" bind:checked={filter.showEmptyValuesOnly} id="show-empty-only">
    <label class="form-check-label text-nowrap" for="show-empty-only">Show only empty</label>
  </div>
</div>

