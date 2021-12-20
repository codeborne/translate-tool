<script lang="ts">
  import {LoadedProject} from '../common/Project'

  export let project: LoadedProject
  export let lang: string
  export let keyPrefix: string

  function add() {
    const keySuffix = prompt('New key: ' + keyPrefix + '.')
    if (!keySuffix) return
    const key = keyPrefix + '.' + keySuffix
    alert('Creating ' + key)
  }
</script>

<button class="key-adder border-0" title="Add new key here" on:click={add}>+</button>

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
