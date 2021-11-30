<script lang="ts">
  export let selectedDict: Record<string, any>
  export let defaultDict: Record<any, string>
  export let uneditedDict: Record<string, any>
  export let keyPrefix = ''
  export let isChanged = false
  export let filter: string
  export let showEmptyKeys: boolean

  function checkForChanges(input, original) {
    isChanged =  input === original // if match, unchanged, if not, changed
  }

  const fullKey = (key: string) => (keyPrefix ? keyPrefix + '.' : '') + key
</script>

{#each Object.keys(defaultDict) as key}
  {#if typeof defaultDict[key] === 'object' && defaultDict[key]}
    <svelte:self bind:showEmptyKeys keyPrefix={fullKey(key)} selectedDict={selectedDict[key] ??= {}} defaultDict={defaultDict[key]} uneditedDict={uneditedDict[key] ??= {}} {filter}/>
  {:else}

    {#if fullKey(key).includes(filter) || filter.length === 0}
      {#if showEmptyKeys}
        {#if !uneditedDict[key]}
          <tr>
            <td>{fullKey(key)}</td>
            <td>
              <input bind:value={selectedDict[key]} on:change={() => checkForChanges(selectedDict[key], uneditedDict[key])} class="form-control"
                     class:changed={selectedDict[key] !==  uneditedDict[key]}>
            </td>
            <td>{defaultDict[key]}</td>
          </tr>
        {/if}
      {/if}

      {#if !showEmptyKeys}
        <tr>
          <td>{fullKey(key)}</td>
          <td>
            <input bind:value={selectedDict[key]} on:change={() => checkForChanges(selectedDict[key], uneditedDict[key])} class="form-control"
                   class:changed={selectedDict[key] !==  uneditedDict[key]}>
          </td>
          <td>{defaultDict[key]}</td>
        </tr>
      {/if}
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