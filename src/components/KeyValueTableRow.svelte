<script lang="ts">
  export let dict: Record<string, any>
  export let defaultDict: Record<any, string>
  export let originalDict: Record<string, any>
  export let keyPrefix = ''
  export let isChanged = false
  export let filter: string

  function checkForChanges(input, original) {
    isChanged =  input === original // if match, unchanged, if not, changed
  }

  const fullKey = (key: string) => (keyPrefix ? keyPrefix + '.' : '') + key
</script>

{#each Object.keys(defaultDict) as key}
  {#if typeof defaultDict[key] === 'object' && defaultDict[key]}
    <svelte:self keyPrefix={fullKey(key)} dict={dict[key] ??= {}} defaultDict={defaultDict[key]} originalDict={originalDict[key] ??= {}} {filter}/>
  {:else}
    {#if fullKey(key).includes(filter) || filter.length === 0}
    <tr>
      <td>{fullKey(key)}</td>
      <td>
        <input bind:value={dict[key]} on:change={() => checkForChanges(dict[key], originalDict[key])} class="form-control"
               class:changed={dict[key] !==  originalDict[key]}>
      </td>
      <td>{defaultDict[key]}</td>
    </tr>
    {/if}
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
</style>