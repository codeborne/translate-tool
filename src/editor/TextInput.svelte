<script lang="ts">

  import {getValue} from '../common/utils'
  import type {Dict} from '../common/Project'

  export let lang: string
  export let key: string
  export let fullKey: string
  export let dict: Dict
  export let uneditedDict: Dict

  let isPreviewing: boolean = false

  function isHtml(fullKey: string): boolean {
    let result: boolean = false
    fullKey.split('.').forEach((key: string) => {
      if (key.endsWith("Html")) result = true
    })
    return result
  }

  $: dict[key] = dict[key] ?? ''
  $: uneditedDict[key] = uneditedDict[key] ?? ''

</script>

{#if !isHtml(fullKey)}
  <textarea {lang} bind:value={dict[key]} class="form-control"
            class:changed={(getValue(key, dict) ?? '') !== (getValue(key, uneditedDict) ?? '')}></textarea>
{:else}
  <div class="d-flex html-input">
    {#if !isPreviewing}
      <div bind:innerHTML={dict[key]} class="form-control"
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
      <i class="fas fa-code"></i>
    </button>
  </div>
{/if}

<style>

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
  }

  .preview .form-control {
    border-top-left-radius: 0;
  }

  .html-input .form-control {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  .form-control {
    min-height: 38px;
    max-height: 38px;
    overflow-y: hidden;
    transition: max-height 0.5s ease-in-out;
    resize: none;
  }

  .form-control:focus, textarea:focus {
    max-height: 12rem;
    box-shadow: none;
    overflow-y: scroll;
  }

  .preview .form-control {
    max-height: 12rem;
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
    border-color: lightblue;
  }
</style>