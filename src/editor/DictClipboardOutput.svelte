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

<div class="d-flex justify-content-between mb-3">
  <!-- TODO: show how many keys changed -->
  <slot/>
  <button on:click={copy} class="btn btn-primary w-auto"><i class="fas fa-copy me-1"></i> Copy json to clipboard</button>
  <a class="btn btn-primary" href="#top">Jump to top</a>
</div>

<textarea id="rawOutput" bind:this={textarea}
          class="form-control mb-3 bg-light"
          style={{width: '100%'}}
          rows="20">{JSON.stringify(dict, null, indent)}</textarea>
