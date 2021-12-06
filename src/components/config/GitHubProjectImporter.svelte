<script lang="ts">
  import {b64DecodeUnicode} from '../../utils'

  export let token: string = ''
  export let projects: any[]

  let url: string = ''
  let langs: Record<string, any>
  let warning: string
  let username: string = 'paywerk'
  let repo: string = 'paywerk'
  let structure: string = '/i18n/common'
  let title: string = 'Paywerk Common'
  let indent: number = 2

  async function submit() {
    warning = ''
    if (areInputsValid()) {
      let dictUrl = `https://api.github.com/repos/${username}/${repo}/contents${structure}/`
      let dict = await fetchDict(dictUrl + 'langs.json', token)
      if (dict) {
        dict = JSON.parse(b64DecodeUnicode(dict.content)) // content is base64 encoded and required decoding
        validate(dict)
        if (warning == '') {
          langs = dict
          save(dictUrl)
          warning = ''
        }
      }
    }
  }

  function areInputsValid() {
    if (username) {
      if (token) {
        if (structure) {
          if (repo) {
            return true
          } else {
            warning = 'Repository name must not be empty'
          }
        } else {
          warning = 'Project location must not be empty'
        }
      } else {
        warning = 'Token must not be empty'
      }
    } else {
      warning = 'Url must not be empty'
    }
    return false
  }


  function save(langsUrl: string) {
    if (!localStorage.getItem('projects')) {
      localStorage.clear() // clears everything from localStorage, including selectedProject key.
      localStorage.setItem('projects', JSON.stringify([]))
    }
    if (!localStorage.getItem('selectedProject')) localStorage.setItem('selectedProject', title)
    let newProject = {
      title,
      url: langsUrl,
      token,
      indent,
    }

    let newProjects: any[] = JSON.parse(localStorage.getItem('projects') as string)
    newProjects.push(newProject)
    localStorage.setItem('projects', JSON.stringify(newProjects))
    projects = newProjects
  }

  function fetchDict(dictUrl, token) {
    const headers = new Headers({'Authorization': `token ${token}`});
    return fetch(dictUrl, { method: 'GET', headers})
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return response.text().then(text => {
            throw (JSON.parse(text))
          })}})
      .catch((err) => {
        warning = err.message
      })
  }

  function validate(arr: any) {
    return !arr ? warning = 'Invalid file' : !Array.isArray(arr) ? warning = 'Must be an array' : warning = ''
  }
</script>

<div id="addPrivate" class="outline p-3 mb-3 d-flex flex-column justify-content-center align-items-center">
  <h5 class="mb-4">Import a private dictionary via GitHub</h5>
  <div class="mb-3" >
    <label class="form-label">Project name</label>
    <input type="text" placeholder="project name" bind:value={title} class="form-control" aria-describedby="url">
    <div class="form-text mb-4"><i>You can change it at any time.</i></div>

    <label class="form-label">Repository owner's username</label>
    <input type="text" placeholder="repo owner" bind:value={username} class="form-control" aria-describedby="url">
    <div class="form-text mb-4">eg. <b>codeborne</b> for <i>https://github.com/<b>codeborne</b></i></div>

    <label class="form-label">Repository name</label>
    <input type="text" placeholder="repo name" bind:value={repo} class="form-control" aria-describedby="url">
    <div class="form-text mb-4">eg. <b>translate-tool</b> for <i>https://github.com/codeborne/<b>translate-tool</b></i></div>

    <label class="form-label">Project location</label>
    <input type="text" placeholder="project structure" bind:value={structure} class="form-control" aria-describedby="url">
    <div class="form-text mb-4">Where the project is located within the root repository. eg <b>/i18n</b> or <b>/i18n/merchant</b></div>


    <label class="form-label">Authorization token</label>
    <input type="text" placeholder="auth token" bind:value={token} class="form-control" aria-describedby="url">
    <div class="form-text mb-4">This token will be used to access the private repository</div>
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
