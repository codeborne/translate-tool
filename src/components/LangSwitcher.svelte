<script lang="ts">
  export let langs: string[]
  export let lang = langs[0]
</script>

<div class="container">
  <select bind:value={lang}>
    {#each langs as lang}
      <option value={lang}>{lang.toUpperCase()}</option>
    {/each}
  </select>
</div>
