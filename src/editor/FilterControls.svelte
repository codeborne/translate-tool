<script lang="ts">

  import type Filter from './Filter'

  export let filter: Filter
</script>

<div class="d-flex align-items-center justify-content-start w-50">
  <div class="w-50 pe-3">
    <input class="form-control" bind:value={filter.search} placeholder="Filter...">
  </div>
  <div class="form-check form-switch ms-2">
    <input class="form-check-input" title="Show only empty" type="checkbox" bind:checked={filter.showEmptyValuesOnly} id="show-empty-only">
    <label class="form-check-label text-nowrap" for="show-empty-only">Show only empty</label>
  </div>
</div>

