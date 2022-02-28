<script lang="ts">
  import {onMount} from 'svelte'

  export let dict
  export let defaultDict
  export let key

  let params: string[]
  let missing: string[]

  onMount(() => init())

  $: if (dict[key]) missing = findMissingParams()
  $: if (defaultDict[key]) params = extractParams()

  function init() {
    params = extractParams()
    missing = findMissingParams()
  }

  export function findMissingParams() {
    missing = []
    if (params && params.length) params.forEach((param) => {
      if (!dict[key].includes(param)) missing.push(param)
    })
    return missing
  }

  export const extractParams = () => defaultDict[key].match(/{(.*?)}/g)

</script>

{#if params && missing.length}
  <span class="text-secondary placeholder-warning">
    <i class="fa-solid fa-triangle-exclamation"></i> <b>Missing placeholders:</b> {missing.join(', ')}
  </span>
{/if}