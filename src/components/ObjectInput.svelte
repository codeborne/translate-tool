<script lang="ts">
  import Input from "./Input.svelte";

  export let dict: Record<string, any>

</script>


<div class="indent">
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
</div>

<style>

  .indent {
    box-sizing: border-box;
    padding-left: 5%;
  }

  input {
    width: 100%;
  }

  label {
    border-top: 1px dashed lightgray;
    display: block;
    text-align: left;
    color: blue;
    padding: 10px 0;
  }

</style>