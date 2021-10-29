<script lang="ts">
  import Input from "./Input.svelte";

  export let dict: Record<string, any>

</script>


{#if dict != undefined}
  {#each Object.keys(dict) as value, i}
    {#if typeof dict[value] === 'object' && dict[value] != null}
      <label>{value}
        <svelte:self dict={dict[value]}/>
      </label>
    {:else}
      <Input title={value} value={dict[value]}/>
    {/if}

    <br>
  {/each}
{/if}