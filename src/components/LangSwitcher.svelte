<script lang="ts">
  export let langs: string[]
  export let lang = langs[0]
</script>

<div class="container">
  <select bind:value={lang} class="form-select">
    {#each langs as lang}
      <option value={lang}>{lang.toUpperCase()}</option>
    {/each}
  </select>
  <button class="btn btn-primary mt-3">Change Language</button>
</div>
