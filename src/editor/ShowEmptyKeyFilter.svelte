<script lang="ts">
  export let showEmptyValuesOnly: boolean
</script>

<div class="card p-3 d-flex align-self-start">
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" bind:checked={showEmptyValuesOnly} id="show-empty-only">
    <label class="form-check-label" for="show-empty-only">Show only empty keys</label>
  </div>
</div>
