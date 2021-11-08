<script lang="ts">
  export let langs: string[]
  export let lang = langs[0]
  let selected:string = lang

  function selectLang() {
    lang = selected
  }
</script>

<div class="container">
  <select bind:value={selected} class="form-select">
    {#each langs as lang}
      <option value={lang}>{lang.toUpperCase()}</option>
    {/each}
  </select>
  <button on:click={selectLang} class="btn btn-primary mt-3">Change Language</button>
</div>
