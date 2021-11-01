<script lang="ts">
  export let dict: Record<string, any>
  export let configSet: Record<any, string>
</script>

{#each Object.keys(configSet) as key}
  {#if typeof configSet[key] === 'object' && configSet[key] != null}
    <svelte:self dict={dict[key] ??= {}} configSet={configSet[key]}/>
  {:else}
    <tr>
      <td>{key}</td>
      <td><input bind:value={dict[key]} placeholder={dict[key]}></td>
      <td>{configSet[key]}</td>
    </tr>
  {/if}
{/each}

<style>
  input {
    width: 100%;
  }
</style>