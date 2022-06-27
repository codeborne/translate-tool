<script lang="ts">
  import {createEventDispatcher} from 'svelte'
  import type {Dict} from '../common/Project'
  import {LoadedProject} from '../common/Project'
  import {rebuildDictInOrder} from './rebuildDictInOrder'
  import Icon from '../components/Icon.svelte'
  import {copyToClipboard} from '../common/utils'

  export let dict: Dict
  export let defaultDict: Dict
  export let lang: string
  export let indent: number

  let output: Dict
  $: if (dict) output = rebuildDictInOrder(dict, defaultDict)

  let textarea: HTMLTextAreaElement

  const dispatch = createEventDispatcher()

  function copy() {
    copyToClipboard(textarea)
    dispatch('copied')
  }
</script>

<div class="d-flex flex-column flex-md-row align-items-md-center w-100 mb-3 mb-lg-4 gap-3 gap-md-0">
  <a class="btn btn-sm btn-icon btn-secondary order-md-last ms-md-auto" href="#top">
    <Icon name="arrowTop"/>
    Jump to top
  </a>
  <button on:click={copy} class="btn btn-primary btn-icon w-auto order-md-0 me-md-3 me-lg-4">
    <Icon name="copy"/>
    Copy json to clipboard
  </button>
  <div class="d-flex gap-2">
    <slot/>
  </div>
</div>

<textarea readonly id="rawOutput" {lang} bind:this={textarea}
          class="form-control bg-light"
          rows="20">{LoadedProject.prettyFormat(output, indent)}</textarea>
