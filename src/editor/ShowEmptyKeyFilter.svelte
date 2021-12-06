<script lang="ts">
  export let showEmptyKeys: boolean

  const toggleEmptyKeys = () => showEmptyKeys = !showEmptyKeys
</script>

<div class="card p-3 d-flex align-self-start">
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" value={showEmptyKeys} on:change={toggleEmptyKeys} id="flexSwitchCheckDefault">
    <label class="form-check-label" for="flexSwitchCheckDefault">Show only empty keys</label>
  </div>
</div>
