<script lang="ts">
  export let dict: Record<string, any>
  export let defaultDict: Record<any, string>
  export let originalDict: Record<string, any>
  export let keyPrefix = ''

  const fullKey = (key: string) => (keyPrefix ? keyPrefix + '.' : '') + key
</script>

{#each Object.keys(defaultDict) as key}
  {#if typeof defaultDict[key] === 'object' && defaultDict[key]}
    <svelte:self keyPrefix={fullKey(key)} dict={dict[key] ??= {}} defaultDict={defaultDict[key]} originalDict={originalDict[key] ??= {}}/>
  {:else}
    <tr>
      <td>{fullKey(key)}</td>
      <td>
        <input bind:value={dict[key]} class="form-control"
               class:changed={dict[key] !==  originalDict[key]}>
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
</style>