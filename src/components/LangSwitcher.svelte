<script lang="ts">
  import langs from '../../i18n/langs.json'

  export let lang = langs[0]
</script>

<div class="container">

  <select bind:value={lang}>
    {#each langs as lang}
      <option value={lang}>{lang.toUpperCase()}</option>
    {/each}
  </select>
</div>
