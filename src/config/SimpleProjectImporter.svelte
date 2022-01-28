<script lang="ts">
  import type {Project} from '../common/Project'
  import {createEventDispatcher} from 'svelte'
  import jsonLoader from '../common/JsonLoader'
  import Icon from '../components/Icon.svelte'

  export let projects: Project[]

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
    if (!localStorage.getItem('projects')) {
      localStorage.clear()
      localStorage.setItem('projects', JSON.stringify([]))
    }
    if (!localStorage.getItem('selectedProject')) localStorage.setItem('selectedProject', title)
    let newProject = {
      title,
      url: dictUrl,
      indent,
    }
    let newProjects: any[] = JSON.parse(localStorage.getItem('projects') as string)
    newProjects.push(newProject)
    localStorage.setItem('projects', JSON.stringify(newProjects))
    projects = newProjects
    dispatch('changed')
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

<form class="card shadow px-3 py-lg-4 mb-3 d-flex flex-column justify-content-center align-items-center" on:submit|preventDefault={submit}>
  <h5 class="mb-4">Import a public dictionary</h5>
  <div class="mb-3 w-75">
    <label class="form-label">Project name</label>
    <input type="text" bind:value={title} class="form-control" required autofocus>
    <div class="form-text mb-4">You can change it at any time</div>

    <label class="form-label">Translation files URL</label>
    <input type="url" placeholder="Must end with /" bind:value={url} class="form-control" pattern=".*/" required>
    <div class="form-text mb-4">Should contain <b>langs.json</b> and corresponding language files, e.g. <b>en.json</b></div>
  </div>
  <button class="btn btn-primary btn-lg btn-icon w-auto px-lg-5"><Icon class="me-lg-2" name="fileImport"/>Import</button>
  {#if warning}
    <div class="alert alert-warning">
      {warning}
    </div>
  {/if}
</form>
