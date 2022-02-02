<script lang="ts">
  import {createEventDispatcher} from 'svelte'
  import type {Dict} from '../common/Project'
  import {LoadedProject} from '../common/Project'
  import {deepCopy} from '../common/utils'
  import {cleanEmptyKeys} from './cleanEmptyKeys'
  import Icon from '../components/Icon.svelte'

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

<div class="d-flex flex-column w-100 mb-3 mb-lg-4 gap-3 gap-lg-4">
  <a class="btn btn-sm btn-icon btn-secondary" href="#top"><Icon name="arrowTop"/> Jump to top</a>
  <hr class="my-1">
  <slot name="counter"/>
    <button on:click={copy} class="btn btn-primary btn-icon w-auto"><Icon name="copy"/>Copy json to clipboard</button>
    <slot/>
</div>

<textarea id="rawOutput" {lang} bind:this={textarea}
          class="form-control bg-light"
          rows="20">{LoadedProject.prettyFormat(output, indent)}</textarea>
