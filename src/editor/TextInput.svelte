<script lang="ts">

  import {getValue} from '../common/utils'
  import type {Dict} from '../common/Project'

  export let lang: string
  export let key: string
  export let dict: Dict
  export let uneditedDict: Dict

  let isPreviewing: boolean = false

  const isHtml = (suffix: string) => suffix.endsWith("Html")

  $: dict[key] = dict[key] ?? ''
  $: uneditedDict[key] = uneditedDict[key] ?? ''

</script>

{#if !isHtml(key)}
  <textarea {lang} bind:value={dict[key]} class="form-control"
            class:changed={(getValue(key, dict) ?? '') !== (getValue(key, uneditedDict) ?? '')}
            class:dynamic-textarea={dict && dict[key] && getValue(key, dict).length > 50}></textarea>
{:else}
  <div class="d-flex html-input">
    {#if !isPreviewing}
      <div bind:innerHTML={dict[key]} class="form-control"
           contenteditable="true"
           class:changed={(getValue(key, dict) ?? '') !== (getValue(key, uneditedDict) ?? '')}
           class:dynamic-textarea={dict && dict[key] && getValue(key, dict).length > 50}>
      </div>
    {:else}
      <div class="preview">
        <div class="form-text bg-light ">
          <i class="fab fa-html5"></i> HTML
        </div>
        <div class="form-control w-100 h-100"
             class:changed={(getValue(key, dict) ?? '') !== (getValue(key, uneditedDict) ?? '')}
             class:dynamic-textarea={dict && dict[key] && getValue(key, dict).length > 50}>
          {dict[key]}
        </div>
      </div>
    {/if}
    <button class="btn btn-sm btn-light text-primary" title="Preview HTML"
            on:click={() => isPreviewing = !isPreviewing}>
      <i class="fas fa-code"></i>
    </button>
  </div>
{/if}

<style>

  .preview {
    width: 100%;
    display: flex;
    flex-direction: column;
    transition: 3s;
  }

  .preview .form-text {
    padding: 1px 5px;
    margin: 0;
    border: 1px solid #ced4da;
    border-bottom: 0;
    border-top-left-radius: 0.25rem;
  }

  .preview .form-control {
    border-top-left-radius: 0;
  }

  textarea, [contenteditable] {
    width: 100%;
    height: 100%;
    transition: 0.3s;
    overflow: hidden;
  }

  textarea {
    max-height: 0;
  }

  .html-input .form-control {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  .html-input button {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    border: 1px solid #ced4da;
    border-left: 0;
  }

  .changed {
    background-color: aliceblue;
    border-color: lightblue;
  }

  .dynamic-textarea:focus {
    max-height: 30em;
    height: 8em;
    overflow-y: auto;
  }
</style>