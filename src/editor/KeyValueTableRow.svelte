<script lang="ts">
  import type {Dict} from '../common/Project'
  import type Filter from './Filter'
  import DictKeyAdder from './DictKeyAdder.svelte'
  import TextInput from './TextInput.svelte'
  import {getValue} from '../common/utils'
  import Translator from '../translator/Translator.svelte'
  import DefaultLangValue from './DefaultLangValue.svelte'
  import MissingParamsWarning from './MissingParamsWarning.svelte'
  import {fade} from 'svelte/transition'

  export let excludedKeys: Set<string>
  export let lang: string
  export let defaultLang: string
  export let dict: Dict, defaultDict: Dict, uneditedDict: Dict
  export let keyPrefix = ''
  export let filter: Filter
  export let isFirefox: boolean

  const fullKey = (key: string) => (keyPrefix ? keyPrefix + '.' : '') + key
</script>

{#each Object.entries(defaultDict).map(e => [fullKey(e[0]), ...e]).filter(([fullKey]) => lang === defaultLang || !excludedKeys.has(fullKey)) as [fullKey, key, defaultValue]}
  {#if typeof defaultValue === 'object'}
    <svelte:self keyPrefix={fullKey} dict={dict[key] ??= {}} defaultDict={defaultValue} {isFirefox} {excludedKeys} {defaultLang} uneditedDict={uneditedDict[key] ??= {}} {filter} {lang}/>
  {:else if filter.shouldShow(fullKey, getValue(key, uneditedDict))}
    <tr class="dict-key" class:empty={!dict[key]} transition:fade|local>
      <td>
        {fullKey}
        {#if excludedKeys.has(fullKey) || excludedKeys.has(keyPrefix)}
          <div class="text-secondary text-small">Marked as untranslatable</div>
        {/if}
        {#if dict === defaultDict}
          <DictKeyAdder bind:dict={defaultDict} {keyPrefix} {key}/>
        {/if}
      </td>
      <td>
        <TextInput bind:dict {key} {isFirefox} fullKey={fullKey} {uneditedDict}/>
        <MissingParamsWarning {dict} {defaultDict} {key}/>
      </td>
      <td>
        <div class="d-flex justify-content-between align-items-center">
          <DefaultLangValue {defaultDict} {key} fullKey={fullKey}>
            <Translator {lang} {defaultLang} bind:dict {key} {defaultDict} {uneditedDict}/>
          </DefaultLangValue>
        </div>
      </td>
    </tr>
  {/if}
{/each}

<style>
  .dict-key:nth-of-type(2n) {
    background-color: rgba(248, 248, 248, 0.4);
    border: #f1f1f1 solid;
    border-width: 1px 0;
  }
</style>
