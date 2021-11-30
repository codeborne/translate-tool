<script lang="ts">

  export let project: Record<string, any>
  export let selectedProject
  export let lang;
  export let changed:boolean
  export let langs: string[]

  let selectedLang:string;

  function selectLang() {
    lang = selectedLang
    toggleButtons()
  }

  $: if (selectedProject) setLangOnProjectChange()

  function setLangOnProjectChange() {
    lang = project.defaultLang
  }


  function toggleButtons() {
    const buttons = document.querySelectorAll('.select-lang') as HTMLButtonElement[]
    if (selectedLang == lang) {
      buttons.forEach(btn => btn.disabled = true)
    } else {
      buttons.forEach(btn => btn.disabled = false)
    }
  }

  $: if (selectedLang) toggleButtons()

</script>

{#if lang}
<div class="outline p-3 w-50">
  <h5 class="mb-4">Language Selection</h5>
  <div class="d-flex flex-column">
    <select bind:value={selectedLang} class="form-select mb-3">
      {#each langs as language}
        <option value={language}>{language.toUpperCase()}</option>
      {/each}
    </select>
    {#if changed}
      <button disabled on:click={selectLang} class="btn btn-primary select-lang">Change Language <i class="fas fa-globe"></i></button>
    {:else}
      <button disabled type="button" class="btn btn-primary select-lang" data-bs-toggle="modal" data-bs-target="#confirmModal">
        Change Language <i class="fas fa-globe"></i>
      </button>
    {/if}
  </div>
</div>
{/if}

<div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
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

<style>
  .outline {
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: white;
  }
  h1, h2, h3, h4, h5, h6 {
    color: #404142;
  }
</style>
