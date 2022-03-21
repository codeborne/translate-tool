<script lang="ts">
  import type {Project} from '../common/Project'
  import {createEventDispatcher} from 'svelte'
  import jsonLoader from '../common/JsonLoader'
  import Icon from '../components/Icon.svelte'

  let url: string = ''
  let title: string = ''
  let indent: number = 2

  const dispatch = createEventDispatcher()

  let warning = ''
  async function submit() {
    warning = ''
    if (url) {
      let dict = await jsonLoader.loadJson(url + 'langs.json')
      if (validate(dict)) save(url)
    } else warning = 'Input must not be empty'
  }

  function save(dictUrl: string) {
    const project: Project = {title, url: dictUrl, indent}
    dispatch('imported', project)
  }

  function validate(arr: any) {
    if (arr) {
      if (!Array.isArray(arr)) {
        warning = 'Language list file must be an array'
        return false
      }
      return true
    } else {
      warning = 'Invalid file'
      return false
    }
  }
</script>

<form class="d-flex flex-column" on:submit|preventDefault={submit}>
    <h5 class="card-title mb-3 mb-lg-4">Import dictionary from public URL</h5>
    <label class="form-label">Project name</label>
    <input type="text" bind:value={title} class="form-control" required autofocus>
    <div class="form-text mb-4">You can change it at any time</div>

    <label class="form-label">Translation files URL</label>
    <input type="url" placeholder="Must end with /" bind:value={url} class="form-control" pattern=".*/" required>
    <div class="form-text mb-4">Should contain <b>langs.json</b> and corresponding language files, e.g. <b>en.json</b></div>
  <div>
    <button class="btn btn-primary btn-icon w-auto px-lg-4 justify-content-center">
      <Icon class="me-lg-2" name="fileImport"/>
      Import
    </button>
  </div>
  {#if warning}
    <div class="alert alert-warning">
      {warning}
    </div>
  {/if}
</form>
