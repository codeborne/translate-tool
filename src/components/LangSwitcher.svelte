<script lang="ts">
  export let langs: string[]
  export let lang = langs[0]
  let selected:string = lang
  export let saved:boolean

  function selectLang() {
    lang = selected
  }
</script>

<div class="container">
  <select bind:value={selected} class="form-select mb-3">
    {#each langs as lang}
      <option value={lang}>{lang.toUpperCase()}</option>
    {/each}
  </select>
  {#if saved}
    <button on:click={selectLang} class="btn btn-primary">Change Language</button>
  {:else}
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmModal">
      Change Language
    </button>
  {/if}
</div>

<!-- Modal -->
<div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="confirmModalLabel">Uncopied changes</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        There are uncopied changes present. Changing the current working language will wipe your progress.
        Continue?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button data-bs-dismiss="modal" type="button" class="btn btn-primary" on:click={selectLang}>Save changes</button>
      </div>
    </div>
  </div>
</div>
