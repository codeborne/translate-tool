<script lang="ts">

  import type {Dict} from '../common/Project'
  import type Filter from './Filter'
  import DictKeyAdder from './DictKeyAdder.svelte'

  export let lang: string
  export let dict: Dict, defaultDict: Dict, uneditedDict: Dict
  export let keyPrefix = ''

  export let filter: Filter

  function getValue(key: string, dict: Dict): string {
    return dict[key] as string
  }

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
        <textarea {lang} bind:value={dict[key]} class="form-control" rows="1"
                  class:changed={getValue(key, dict) !== getValue(key, uneditedDict)}
                  class:dynamic-textarea={dict && dict[key] && getValue(key, dict).length > 50}></textarea>
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
  .changed {
    background-color: aliceblue;
    border-color: lightblue;
  }

  .dynamic-textarea:focus {
    max-height: 30em;
    height: 8em;
    overflow-y: auto;
  }

  textarea {
    width: 100%;
    height: 0;
    max-height: 0;
    transition: 0.3s;
    overflow: hidden;
  }

  .empty {
    background-color: #fbfce1;
    border-color: #feffe0;
  }
</style>