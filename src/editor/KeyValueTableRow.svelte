<script lang="ts">
  import type {Dict} from '../common/Project'
  import type Filter from './Filter'
  import DictKeyAdder from './DictKeyAdder.svelte'
  import TextInput from './TextInput.svelte'
  import {getValue} from '../common/utils'
  import Translator from '../translator/Translator.svelte'
  import DefaultLangValue from './DefaultLangValue.svelte'
  import MissingParamsWarning from './MissingParamsWarning.svelte'

  export let excludedKeys: Set<string>
  export let lang: string
  export let defaultLang: string
  export let dict: Dict, defaultDict: Dict, uneditedDict: Dict
  export let keyPrefix = ''
  export let filter: Filter

  const fullKey = (key: string) => (keyPrefix ? keyPrefix + '.' : '') + key
</script>

{#each Object.entries(defaultDict).filter(([key]) => lang === defaultLang || !excludedKeys.has(fullKey(key))) as [key, defaultValue]}
  {#if typeof defaultValue === 'object'}
    <svelte:self keyPrefix={fullKey(key)} dict={dict[key] ??= {}} defaultDict={defaultValue} {excludedKeys} {defaultLang} uneditedDict={uneditedDict[key] ??= {}} {filter} {lang}/>
  {:else if filter.shouldShow(fullKey(key), getValue(key, uneditedDict))}
    <tr class:empty={!dict[key]}>
      <td>
        {fullKey(key)}
        {#if excludedKeys.has(fullKey(key)) || excludedKeys.has(keyPrefix)}
          <div class="text-secondary placeholder-warning">Marked as untranslatable</div>
        {/if}
        {#if dict === defaultDict}
          <DictKeyAdder bind:dict={defaultDict} {keyPrefix} {key}/>
        {/if}
      </td>
      <td>
        <TextInput bind:dict {key} fullKey={fullKey(key)} {uneditedDict} {lang}/>
        <MissingParamsWarning {dict} {defaultDict} {key}/>
      </td>
      <td>
        <div class="d-flex justify-content-between align-items-center">
          <DefaultLangValue {defaultDict} {key} fullKey={fullKey(key)}>
            <Translator {lang} {defaultLang} bind:dict {key} {defaultDict} {uneditedDict}/>
          </DefaultLangValue>
        </div>
      </td>
    </tr>
  {/if}
{/each}
