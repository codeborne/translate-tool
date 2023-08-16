<script lang="ts">
  import {countChangedValues} from './languageStats'
  import type {Dict} from '../common/Project'
  import Icon from '../components/Icon.svelte'
  import {slide} from 'svelte/transition'

  export let dict: Dict
  export let uneditedDict: Dict

  let changes = 0

  $: if (dict) changes = countChangedValues(dict, uneditedDict)
</script>

{#if changes}
  <div class="num-changes btn shadow" transition:slide|local>
    <Icon name="info" class="me-1 text-warning"/>
    <span>{changes} {changes === 1 ? `change` : `changes`}</span>
  </div>
{/if}

<style>
  .num-changes:hover {
    cursor: default;
    background-color: white;
  }
</style>
