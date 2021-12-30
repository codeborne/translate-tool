<script lang="ts">

  import type {Dict} from '../common/Project'
  import type Filter from './Filter'
  import DictKeyAdder from './DictKeyAdder.svelte'
  import TextInput from './TextInput.svelte'
  import {getValue} from '../common/utils'

  export let lang: string
  export let dict: Dict, defaultDict: Dict, uneditedDict: Dict
  export let keyPrefix = ''

  export let filter: Filter

  const fullKey = (key: string) => (keyPrefix ? keyPrefix + '.' : '') + key
</script>

{#each Object.entries(defaultDict) as [key, defaultValue]}
  {#if typeof defaultValue === 'object'}
    <svelte:self keyPrefix={fullKey(key)} dict={dict[key] ??= {}} defaultDict={defaultValue} uneditedDict={uneditedDict[key] ??= {}} {filter} {lang}/>
    {:else if filter.shouldShow(fullKey(key), getValue(key, uneditedDict))}
    <tr class:empty={!dict[key]}>
      <td class="w-25">
        {fullKey(key)}
        {#if dict === defaultDict}
          <DictKeyAdder {dict} {keyPrefix} {key}/>
        {/if}
      </td>
      <td class="w-100">
        <TextInput bind:dict {key} {uneditedDict} {lang}/>
      </td>
      <td>
        {defaultDict[key]}
        <a target="translate" href="https://translate.google.com/?sl=auto&tl={lang}&text={encodeURIComponent(getValue(key, defaultDict))}&op=translate"
           title="Open Google Translate" class="float-end"><i class="fas fa-language"></i></a>
      </td>
    </tr>
  {/if}
{/each}

<style>

  .empty {
    background-color: #fbfce1;
    border-color: #feffe0;
  }
</style>