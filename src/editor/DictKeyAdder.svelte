<script lang="ts">
  import {Dict} from '../common/Project'

  export let dict: Dict
  export let keyPrefix: string

  let button: HTMLButtonElement

  function add() {
    const keySuffix = prompt('New key: ' + keyPrefix + '.')
    if (!keySuffix) return
    dict[keySuffix] = ''
    button.dispatchEvent(new Event('change', {bubbles: true}))
  }
</script>

<button bind:this={button} class="key-adder border-0" title="Add new key here" on:click={add}>+</button>

<style>
  :global(tr .key-adder) {
    position: absolute;
    display: none;
    left: 0;
  }

  :global(tr:hover .key-adder) {
    display: block;
  }
</style>
