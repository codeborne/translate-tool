<script lang="ts">
  import {containsHTMLTags, getValue, isHtml} from '../common/utils'
  import type {Dict} from '../common/Project'
  import ContainsHTMLWarning from './ContainsHTMLWarning.svelte'
  import EditableField from 'src/editor/EditableField.svelte'

  export let key: string
  export let fullKey: string
  export let dict: Dict
  export let uneditedDict: Dict
  export let isFirefox: boolean

  let isPreviewing: boolean = false

  $: dict[key] = dict[key] ?? ''
  $: uneditedDict[key] = uneditedDict[key] ?? ''
  $: changed = dict[key] !== uneditedDict[key]
</script>

{#if !isHtml(fullKey)}
  <EditableField {isFirefox} bind:value={dict[key]} {changed}/>
  {#if containsHTMLTags(dict[key])}<ContainsHTMLWarning/>{/if}
{:else}
  <div class="d-flex html-input">
    {#if !isPreviewing}
      <div bind:innerHTML={dict[key]} class="text-input w-100 is-html" class:changed
           contenteditable="true" on:paste={e => alert(1)}></div>
    {:else}
      <div class="preview">
        <div class="form-text bg-light ">
          <i class="fab fa-html5"></i> HTML
        </div>
        <EditableField {isFirefox} bind:value={dict[key]} {changed}/>
      </div>
    {/if}
    <button class="btn btn-sm btn-light text-primary" title={isPreviewing ? 'Show styled text' : 'Show HTML'}
            on:click={() => isPreviewing = !isPreviewing}>
      <i class="fas fa-eye{isPreviewing ? '-slash' : ''}"></i>
    </button>
  </div>
{/if}

<style global>
  .preview {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .preview .form-text {
    padding: 1px 5px;
    margin: 0;
    border: 1px solid #ced4da;
    border-bottom: 0;
    border-top-left-radius: 0.25rem;
    font-size: 0.7rem !important;
  }

  .preview .text-input {
    border-top-left-radius: 0;
  }

  .html-input .text-input {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  .text-input {
    resize: none;
    overflow: hidden;
    min-height: 36px;
    height: 100%;
    white-space: pre-line;
    border: 1px solid rgba(155, 155, 155, 0.35);
    border-radius: 5px;
    padding: 5px 5px;
    background-color: white;
  }

  .text-input:focus {
    box-shadow: none;
  }

  .btn {
    box-shadow: none;
  }

  .html-input button {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    border: 1px solid #ced4da;
    border-left: 0;
  }

  .changed {
    background-color: aliceblue !important;
  }
</style>
