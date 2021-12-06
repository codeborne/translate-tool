<script lang="ts">
  export let dict: Record<string, any>
  export let defaultDict: Record<any, string>
  export let uneditedDict: Record<string, any>
  export let keyPrefix = ''

  export let filter: string
  export let showEmptyValuesOnly: boolean

  const fullKey = (key: string) => (keyPrefix ? keyPrefix + '.' : '') + key

  function show(key: string, value: string, filter: string, showEmptyValuesOnly: boolean) {
    return (!filter || fullKey(key).toLowerCase().includes(filter.toLowerCase())) &&
           (!showEmptyValuesOnly || !value)
  }
</script>

{#each Object.entries(defaultDict) as [key, defaultValue]}
  {#if typeof defaultValue === 'object'}
    <svelte:self keyPrefix={fullKey(key)} dict={dict[key] ??= {}} defaultDict={defaultValue} uneditedDict={uneditedDict[key] ??= {}} {filter} {showEmptyValuesOnly}/>
  {:else if show(key, uneditedDict[key], filter, showEmptyValuesOnly)}
    <tr class:empty={!dict[key]}>
      <td>{fullKey(key)}</td>
      <td>
        <input bind:value={dict[key]} class="form-control" class:changed={dict[key] !== uneditedDict[key]}>
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