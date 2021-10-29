<script lang="ts">
  import langs from '../../i18n/langs.json'

  export let lang = langs[0]
</script>

<div class="container">
  <h2>Selected {lang}</h2>

  <h3>Available langs {langs}</h3>

  <select bind:value={lang}>
    {#each langs as lang}
      <option value={lang}>{lang.toUpperCase()}</option>
    {/each}
  </select>
</div>
