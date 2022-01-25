<script lang="ts">
  import {totalDifferentValues} from './languageStats'
  import type {Dict} from '../common/Project'

  export let dict: Dict
  export let uneditedDict: Dict

  let changes = 0

  $: if (dict) changes = totalDifferentValues(dict, uneditedDict)
</script>

<div class="num-changes card shadow h-100 flex-row justify-content-center bg-light align-items-center p-1 gap-2 text-secondary"
     class:invisible={!changes}>
  <i class="fas fa-info-circle text-warning"></i>
  <span>{changes} {changes === 1 ? `change` : `changes`}</span>
</div>

<style>
  .text-secondary {
    font-size: 0.95em;
    transition: opacity 0.6s;
  }

  .invisible {
    visibility: hidden;
    opacity: 0;
  }
</style>
