<script lang="ts">
  import {copyToClipboard} from '../common/utils'

  export let config
  let textarea: HTMLTextAreaElement

  function copy() {
    copyToClipboard(textarea)
    confirm("Copied!")
  }
</script>

<div class="copy-textarea w-100">
  <textarea readonly bind:this={textarea}
            class="form-control bg-light text-secondary form-text"
            rows="8">{JSON.stringify(config, null, 2)}</textarea>

  <button class="btn btn-sm btn-primary mt-3 align-self-right" on:click={copy}>Copy</button>
</div>

<style>
  .copy-textarea {
    position: relative;
  }

  .copy-textarea button {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }
</style>






