<script>
  export let isOpen
  export let url
</script>


<form class="container">
  <div class="mb-3" >
    <label for="url" class="form-label">Import a custom configuration</label>
    <input type="text" placeholder="url link here" bind:value={url} class="form-control" id="text" aria-describedby="url">
    <div id="url" class="form-text">You can change it at any time.</div>
  </div>
  <button on:click={() => isOpen = false} type="button" class="btn btn-primary">Import</button>
</form>