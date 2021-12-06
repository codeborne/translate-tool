<script lang="ts">
  export let filter: string = ''
</script>

<div class="card align-self-start mb-3 bg-light p-3">
  <p class="mb-1">Filter the keys by substring.</p>
  <input class="form-control form-control-sm" bind:value={filter} placeholder="filter...">
</div>
