<script lang="ts">
  import type {Dict} from '../common/Project'
  import {totalKeys} from './languageStats'

  export let dict: Dict
  export let defaultDict: Dict
  export let indent: number
  export let defaultLang: string
  export let totalLangs: number

  $: total = totalKeys(defaultDict)
  $: filled = totalKeys(dict)
</script>

<div class="card">
  <h5 class="card-title">Stats</h5>
  <div class="card-body">
    <div class="d-flex gap-3">
      <table class="table">
        <tbody>
        <tr>
          <td>Total keys</td>
          <td>{total}</td>
        </tr>
        <tr>
          <td>Translated keys</td>
          <td>{filled}</td>
        </tr>
        <tr>
          <td>Untranslated keys</td>
          <td>{total - filled}</td>
        </tr>
        </tbody>
      </table>
      <table class="table">
        <tbody>
        <tr>
          <td>Default Language</td>
          <td>{defaultLang}</td>
        </tr>
        <tr>
          <td>Total Languages</td>
          <td>{totalLangs}</td>
        </tr>
        <tr>
          <td>JSON Indent</td>
          <td>{indent}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
