<script lang="ts">
  export let showEmptyKeys: boolean

  const toggleEmptyKeys = () => showEmptyKeys = !showEmptyKeys

</script>

<div class="align-self-start bg-light p-3 outline d-flex">
  <div class="form-check form-switch">
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