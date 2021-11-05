<script>
  export let isOpen
</script>


<form class="container">
  <div class="mb-3" >
    <label for="url" class="form-label">Import a custom configuration</label>
    <input type="text" class="form-control" id="text" aria-describedby="url">
    <div id="url" class="form-text">You can change it at any time.</div>
  </div>
  <button on:click={() => isOpen = false} type="button" class="btn btn-primary">Import</button>
</form>