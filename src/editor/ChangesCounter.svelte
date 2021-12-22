<script lang="ts">
  import {totalDifferentValues} from './languageStats'

  export let dict
  export let uneditedDict
  let changes = 0

  $: if (dict) changes = totalDifferentValues(dict, uneditedDict)
</script>

<div class="card">
  <p><i class="fas fa-exchange-alt"></i> Changes: {changes}</p>
</div>