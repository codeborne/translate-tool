<script lang="ts">
  import Filter from './Filter'

  export let lang: string
  export let dict: Record<string, any>
  export let defaultDict: Record<any, string>
  export let uneditedDict: Record<string, any>
  export let keyPrefix = ''

  export let filter: Filter

  const fullKey = (key: string) => (keyPrefix ? keyPrefix + '.' : '') + key
</script>

{#each Object.entries(defaultDict) as [key, defaultValue]}
  {#if typeof defaultValue === 'object'}
    <svelte:self keyPrefix={fullKey(key)} dict={dict[key] ??= {}} defaultDict={defaultValue} uneditedDict={uneditedDict[key] ??= {}} {filter}/>
  {:else if filter.shouldShow(fullKey(key), uneditedDict[key])}
    <tr class:empty={!dict[key]}>
      <td>{fullKey(key)}</td>
      <td>
        <input {lang} bind:value={dict[key]} class="form-control" class:changed={dict[key] !== uneditedDict[key]}>
      </td>
      <td>{defaultDict[key]}</td>
    </tr>
  {/if}
{/each}

<style>
  input {
    width: 100%;
  }

  .changed {
    background-color: aliceblue;
    border-color: lightblue;
  }

  .empty {
    background-color: #fbfce1;
    border-color: #feffe0;
  }
</style>