<script lang="ts">
  import type {Dict} from '../common/Project'
  import {slide} from 'svelte/transition'


  export let uneditedDict: Dict
  export let defaultDict: Dict

  let missingKeys: string[]

  $: if (uneditedDict) missingKeys = compareDictKeys(defaultDict, uneditedDict)


  function compareDictKeys(target: Dict, source: Dict, fullKey?: string) {
    let missingKeys: string[] = []
    for (let [key, value] of Object.entries(source)) {
      const isObject = typeof value === 'object'
      if (isObject) missingKeys.push(...compareDictKeys(target[key], source[key], fullKey ? `${fullKey}.${key}` : key))
      if (target && (target[key] === undefined || target[key] === null)) missingKeys.push(fullKey ? `${fullKey}.${key}` : key)
    }
    return missingKeys
  }
</script>

{#if missingKeys && missingKeys.length}
  <div class="d-flex flex-row justify-content-between mb-3 p-3 gap-5 alert card shadow" transition:slide|local>
    <div>
      <h5 class="card-title mb-3 mb-lg-4"><i class="fa-solid fa-circle-info"></i> Redundant keys found</h5>

      <p>This current file contains some keys that are not present in the default language.
        It does not necessarily mean something is broken, but this warning can help find mistakes, typos or forgotten unused keys.
      </p>

      <p>Ensure the keys found are actually in use, and delete or add them to the default language.</p>
    </div>
    <div class="w-50">
      <b class="text-center">Missing keys in default lang</b>
      <ul class="list-group list-group-flush mt-3">
        {#each missingKeys as key}
          <li class="list-group-item list-group-item-light px-0 py-1">{key}</li>
        {/each}
      </ul>
    </div>
  </div>
{/if}

