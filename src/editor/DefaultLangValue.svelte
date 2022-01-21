<script lang="ts">
  import {isHtml} from '../common/utils'

  export let defaultDict
  export let key
  export let fullKey
</script>


{#if isHtml(fullKey)}
  <span class="overflow-auto">{defaultDict[key]}</span>
{:else}
  <span class="overflow-auto">{defaultDict[key]}</span>
{/if}
