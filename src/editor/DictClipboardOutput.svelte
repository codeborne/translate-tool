<script lang="ts">
  import {createEventDispatcher} from 'svelte'
  import type {Dict} from '../common/Project'

  export let dict: Dict
  export let indent: number

  let textarea: HTMLTextAreaElement

  const dispatch = createEventDispatcher()

  function copy() {
    textarea.focus()
    textarea.select()
    document.execCommand('copy')
    dispatch('copied')
  }
</script>

<div class="mt-3 card p-3">
  <div class="d-flex justify-content-between mb-3">
    <button on:click={copy} class="btn btn-primary w-auto">Copy json to clipboard <i class="fas fa-copy"></i></button>
    <a class="btn btn-primary" href="#top">Jump to top</a>
  </div>
  <textarea id="rawOutput" bind:this={textarea}
            class="form-control mb-3 bg-light"
            style={{width: '100%'}}
            rows="20">{JSON.stringify(dict, null, indent)}</textarea>
</div>
