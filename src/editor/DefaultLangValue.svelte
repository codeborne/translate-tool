<script lang="ts">
  import {isHtml} from '../common/utils'

  export let defaultDict
  export let key
  export let fullKey
</script>


{#if isHtml(fullKey)}
  <span>{defaultDict[key]}</span>
{:else}
  <span>{defaultDict[key]}</span>
{/if}
