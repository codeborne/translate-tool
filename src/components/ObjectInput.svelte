<script lang="ts">
  import Input from "./Input.svelte";

  export let dict: Record<string, any>
  export let configSet: Record<any, string>

</script>


  {#each Object.keys(dict) as value, i}
    {#if typeof dict[value] === 'object' && dict[value] != null}
        <svelte:self dict={dict[value]} configSet={configSet[value]}/>
    {:else}
      <Input title={value} value={dict[value]} original={configSet[value]}/>
    {/if}
  {/each}

<style>

  input {
    width: 100%;
  }

</style>