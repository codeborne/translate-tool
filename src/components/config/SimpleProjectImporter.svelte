<script lang="ts">
  import type {Project} from '../../Project'

  export let projects: Project[]

  let url: string = ''
  let langs: Record<string, any>
  let title: string = 'Example Public'
  let indent: number = 2

  let warning = ''
  async function submit() {
    warning = ''
    if (url) {
      let dict = await fetchDict(url + 'langs.json')
      if (validate(dict)) {
        langs = dict
        await save(url)
        warning = ''
      }
    } else {
      warning = 'Input must not be empty'
    }
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
  }

  const fetchDict = (dictUrl) => fetch(dictUrl).then(r => r.json()).catch((e) => warning = e)

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

<div id="addPublic" class="outline p-3 mb-3 d-flex flex-column justify-content-center align-items-center">
  <h5 class="mb-4">Import a public dictionary</h5>
  <div class="mb-3">
    <label for="url" class="form-label">Project name</label>
    <input type="text" placeholder="project name" bind:value={title} class="form-control" aria-describedby="url">
    <div class="form-text mb-4"><i>You can change it at any time.</i></div>

    <label for="url" class="form-label">Public configuration link</label>
    <input type="text" placeholder="url link" bind:value={url} class="form-control" aria-describedby="url">
    <div id="url" class="form-text mb-4">You can change it at any time. Example link: <i>../../i18n/langs.json</i></div>
  </div>
  <button on:click={submit} type="button" class="btn btn-primary w-auto">Import</button>
  {#if warning}
    <div class="alert alert-warning">
      {warning}
    </div>
  {/if}
</div>

<style>
  .outline {
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: white;
  }
</style>