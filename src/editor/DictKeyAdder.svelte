<script lang="ts">
  import {Dict} from '../common/Project'
  import {insertKey} from '../common/utils'

  export let dict: Dict
  export let keyPrefix: string
  export let key: string

  let button: HTMLButtonElement

  function add() {
    const keySuffix = prompt('New key: ' + keyPrefix + '.')
    if (!keySuffix) return
    insertKey(dict, keySuffix, Object.keys(dict).indexOf(key))
    button.dispatchEvent(new Event('change', {bubbles: true}))
  }
</script>

<button bind:this={button} class="key-adder border-0" title="Add new key here" on:click={add}>+</button>

<style>
  :global(tr td) {
    position: relative;
  }

  :global(tr) .key-adder {
    position: absolute;
    display: none;
    left: -0.5em;
    bottom: -0.5em;
    background: transparent;
    font-size: 2em;
    line-height: 1;
    padding: 5px;
    color: var(--bs-primary);
  }

  :global(tr:hover) .key-adder {
    display: block;
  }
</style>
