<script lang="ts">
  export let filter: string = ''
  export let showEmptyKeys: boolean

  const toggleEmptyKeys = () => showEmptyKeys = !showEmptyKeys

</script>

<div class="align-self-start mb-3 bg-light p-3 outline">
  <p class="mb-1">Filter the keys by substring.</p>
  <input class="form-control form-control-sm" bind:value={filter} placeholder="filter...">
  <div class="form-check form-switch mt-5">
    <input class="form-check-input" type="checkbox" value={showEmptyKeys} on:change={toggleEmptyKeys} id="flexSwitchCheckDefault">
    <label class="form-check-label" for="flexSwitchCheckDefault">Show only empty keys</label>
  </div>
</div>

<style>
  .outline {
    border: 1px solid lightgray;
    border-radius: 5px;
  }
</style>