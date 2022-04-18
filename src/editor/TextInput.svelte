<script lang="ts">
  import {containsHTMLTags, getValue, isHtml} from '../common/utils'
  import type {Dict} from '../common/Project'


  export let lang: string
  export let key: string
  export let fullKey: string
  export let dict: Dict
  export let uneditedDict: Dict

  let isPreviewing: boolean = false

  $: dict[key] = dict[key] ?? ''
  $: uneditedDict[key] = uneditedDict[key] ?? ''

</script>

{#if !isHtml(fullKey)}
  <div bind:textContent={dict[key]} class="form-control not-html"
       contenteditable="true"
       class:changed={(getValue(key, dict) ?? '') !== (getValue(key, uneditedDict) ?? '')}>
  </div>
  {#if containsHTMLTags(dict[key])}
    <div class="text-secondary text-small">
      <i class="fa-solid fa-triangle-exclamation"></i> Contains HTML tags, but key does not end with <b>Html</b>
    </div>
  {/if}
{:else}
  <div class="d-flex html-input">
    {#if !isPreviewing}
      <div bind:innerHTML={dict[key]} class="form-control is-html"
           contenteditable="true"
           class:changed={(getValue(key, dict) ?? '') !== (getValue(key, uneditedDict) ?? '')}>
      </div>
    {:else}
      <div class="preview">
        <div class="form-text bg-light ">
          <i class="fab fa-html5"></i> HTML
        </div>
        <div class="form-control"
             contenteditable="true"
             bind:textContent={dict[key]}
             class:changed={(getValue(key, dict) ?? '') !== (getValue(key, uneditedDict) ?? '')}>
        </div>
      </div>
    {/if}
    <button class="btn btn-sm btn-light text-primary" title={isPreviewing ? 'Show styled text' : 'Show HTML'}
            on:click={() => isPreviewing = !isPreviewing}>
      {#if isPreviewing}
        <i class="fa-solid fa-eye-slash"></i>
      {:else}
        <i class="fa-solid fa-eye"></i>
      {/if}
    </button>
  </div>
{/if}

<style>
  .preview {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  div .form-control {
    height: 100%;
  }

  .preview .form-text {
    padding: 1px 5px;
    margin: 0;
    border: 1px solid #ced4da;
    border-bottom: 0;
    border-top-left-radius: 0.25rem;
    font-size: 0.7rem !important;
  }

  .preview .form-control {
    border-top-left-radius: 0;
  }

  .html-input .form-control {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  .form-control {
    resize: none;
    overflow: hidden;
    min-height: 36px;
    height: 100%;
  }

  .form-control:focus {
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
    background-color: aliceblue;
  }

  .text-small {
    font-size: small !important;
  }
</style>
