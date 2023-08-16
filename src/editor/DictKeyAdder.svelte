<script lang="ts">
  import type {Dict} from '../common/Project'
  import {insertNestedKey} from '../common/utils'
  import Icon from '../components/Icon.svelte'

  export let dict: Dict
  export let keyPrefix: string
  export let key: string

  let button: HTMLButtonElement

  function add() {
    const keySuffix = prompt('New key: ' + keyPrefix + '.')
    if (!keySuffix) return
    insertNestedKey(dict, keySuffix, Object.keys(dict).indexOf(key))
    button.dispatchEvent(new Event('focusout', {bubbles: true}))
  }
</script>

<button bind:this={button} class="key-adder border-0" title="Add new key below current one" on:click={add}><Icon name="plus"/></button>

<style>
  :global(tr td) {
    position: relative;
  }

  :global(tr) .key-adder {
    position: absolute;
    display: flex;
    left: -0.3em;
    background: transparent;
    bottom: -0.5em;
    font-size: 2em;
    line-height: 1;
    color: var(--primary);
    padding: 10px;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  :global(tr) .key-adder:hover {
    color: var(--primary-accent);
  }

  :global(tr:hover) .key-adder {
    opacity: 1;
  }
</style>
