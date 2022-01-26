<script lang="ts">
  import {createEventDispatcher} from 'svelte'
  import type {Dict} from '../common/Project'
  import {LoadedProject} from '../common/Project'
  import {deepCopy} from '../common/utils'
  import {cleanEmptyKeys} from './cleanEmptyKeys'

  export let dict: Dict
  export let lang: string
  export let indent: number

  let output: Dict
  $: if (dict) output = cleanEmptyKeys(deepCopy(dict))

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
  <div class="d-flex gap-3">
    <slot/>
    <button on:click={copy} class="btn btn-primary w-auto"><i class="fas fa-copy me-1"></i> Copy json to clipboard</button>
    <slot name="counter"/>
  </div>
  <a class="btn btn-primary" href="#top"><i class="fas fa-arrow-up"></i> Jump to top</a>
</div>

<textarea id="rawOutput" {lang} bind:this={textarea}
          class="form-control mb-3 bg-light"
          rows="20">{LoadedProject.prettyFormat(output, indent)}</textarea>
