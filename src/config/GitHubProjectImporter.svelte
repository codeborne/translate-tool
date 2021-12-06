<script lang="ts">
  import {b64DecodeUnicode} from '../common/utils'

  export let token: string = ''
  export let projects: any[]

  let url: string = ''
  let langs: Record<string, any>
  let warning: string
  let username: string = ''
  let repo: string = ''
  let path: string = '/i18n/common'
  let title: string = ''
  let indent: number = 2

  async function submit() {
    warning = ''
    if (areInputsValid()) {
      let dictUrl = `https://api.github.com/repos/${username}/${repo}/contents${path}`
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
        if (path) {
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

<form id="addPrivate" class="card p-3 mb-3 d-flex flex-column justify-content-center align-items-center" on:submit|preventDefault={submit}>
  <h5 class="card-title">Import a private dictionary from GitHub repository</h5>
  <div class="card-body">
    <label class="form-label">Project name</label>
    <input type="text" bind:value={title} class="form-control" required>
    <div class="form-text mb-4"><i>You can change it at any time.</i></div>

    <label class="form-label">Repository owner</label>
    <input type="text" bind:value={username} class="form-control" required>
    <div class="form-text mb-4">eg. <b>codeborne</b> for <i>https://github.com/<b>codeborne</b></i></div>

    <label class="form-label">Repository name</label>
    <input type="text" bind:value={repo} class="form-control" required>
    <div class="form-text mb-4">eg. <b>translate-tool</b> for <i>https://github.com/codeborne/<b>translate-tool</b></i></div>

    <label class="form-label">Path within repository</label>
    <input type="text" bind:value={path} class="form-control" pattern="/.*/" required>
    <div class="form-text mb-4">Where the project is located within the root repository. eg <b>/i18n/</b></div>

    <label class="form-label">Personal auth token</label>
    <input type="text" bind:value={token} class="form-control">
    <div class="form-text mb-4">This token will be used to access the private repository</div>
  </div>

  <button class="btn btn-primary w-auto">Import</button>
  {#if warning}
    <div class="alert alert-warning mt-3">
      {warning}
    </div>
  {/if}
</form>
