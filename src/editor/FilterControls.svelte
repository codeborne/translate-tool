<script lang="ts">

  import type Filter from './Filter'

  export let filter: Filter
</script>

<div class="d-flex gap-3 align-items-center justify-content-start w-50">
  <input class="form-control filter" bind:value={filter.search} placeholder="Filter by key...">
  <div class="form-check form-switch ms-2">
    <input class="form-check-input" title="Show only empty" type="checkbox" bind:checked={filter.showEmptyValuesOnly} id="show-empty-only">
    <label class="form-check-label text-nowrap" for="show-empty-only">Show only empty</label>
  </div>
  <slot/>
</div>

<style>
  .filter {
    max-width: 300px !important;
    min-width: 150px !important;
  }
</style>

