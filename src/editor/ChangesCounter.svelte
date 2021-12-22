<script lang="ts">
  import {totalDifferentValues} from './languageStats'

  export let dict
  export let uneditedDict

  let changes = 0

  $: if (dict) changes = totalDifferentValues(dict, uneditedDict)
</script>

<div class="card flex-row justify-content-center bg-light align-items-center p-1 gap-2 text-secondary mt-2 mb-2"
     class:invisible={!changes}>
  <i class="fas fa-info-circle text-warning"></i>
  <span>{changes} changes</span>
</div>

<style>
  .text-secondary {
    font-size: 0.95em;
    transition: 0.6s;
  }
  .invisible {
    visibility: hidden;
    opacity: 0;
  }
</style>