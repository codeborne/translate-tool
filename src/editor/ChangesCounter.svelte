<script lang="ts">
  import {totalDifferentValues} from './languageStats'

  export let dict
  export let uneditedDict
  let changes = 0

  $: if (dict) changes = totalDifferentValues(dict, uneditedDict)
</script>

<div class="card flex-row justify-content-center bg-light align-items-center p-1 gap-2 text-secondary mt-2 mb-2" class:invisible={!changes}>
  <i class="fas fa-info-circle text-primary"></i>
  <span class="text-secondary"><span id="changeCounter">{changes} changes</span></span>
</div>

<style>
  .text-secondary {
    font-size: 0.95em;
    transition: 0.8s;
  }
  .invisible {
    visibility: hidden;
    opacity: 0;
    transition: 0.8s;
  }
</style>