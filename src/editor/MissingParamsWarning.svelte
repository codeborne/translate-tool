<script lang="ts">
  import {onMount} from 'svelte'

  export let dict
  export let defaultDict
  export let key

  let params: string[]
  let missing: string[]

  onMount(() => init())

  $: if (dict[key]) missing = findMissingParams()
  $: if (defaultDict[key]) init()

  function init() {
    params = extractParams()
    missing = findMissingParams()
  }

  function findMissingParams() {
    missing = []
    if (params && params.length) params.forEach((param) => {
      if (!dict[key].includes(param)) missing.push(param)
    })
    return missing
  }

  const extractParams = () => defaultDict[key].match(/{(.*?)}/g)

</script>

{#if params && missing && missing.length && dict[key]}
  <div class="text-secondary text-small">
    <i class="fa-solid fa-triangle-exclamation"></i> <b>Missing placeholders:</b> {missing.join(', ')}
  </div>
{/if}
