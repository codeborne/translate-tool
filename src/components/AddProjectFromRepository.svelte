<script lang="ts">
  import {b64DecodeUnicode} from '../utils'
  export let isOpen: boolean
  let url: string = ''
  export let token: string = ''
  let langs: Record<string, any>
  let warning = ''
  let username: string = 'paywerk'
  let repo: string = 'paywerk'
  let structure: string = '/i18n/common'
  let title: string = 'Paywerk Common'
  let indent: number = 2
  let defaultLang: string = 'en'
  export let storage: any[]
  export let selected: string

  async function submitPublic() {
    warning = ''
    if (url) {
      let dict = await fetchUrl(url)
      if (validate(dict)) {
        langs = dict
        await saveToLocalStorage(url, true)
        isOpen = false
        warning = ''
      }
    } else {
      warning = 'Input must not be empty'
    }
  }

  async function submitGithub() {
    warning = ''
    if (isGithubFormValid()) {
      let dictUrl = `https://api.github.com/repos/${username}/${repo}/contents${structure}/langs.json`
      let dict = await fetchGithubUrl(dictUrl, token)
      if (dict) {
        dict = JSON.parse(b64DecodeUnicode(dict.content)) // content is base64 encoded and required decoding
        if (validate(dict)) {
          langs = dict
          saveToLocalStorage(dictUrl, false)
          isOpen = false
          warning = ''
        }
      }
    }
  }

  function isGithubFormValid() {
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
      warning = 'Link must not be empty'
    }
    return false
  }


  function saveToLocalStorage(link: string, isPublic: boolean) {
    if (!localStorage.getItem('config')) {
      localStorage.clear()
      localStorage.setItem('config', JSON.stringify([]))
    }
    if (!localStorage.getItem('selected')) localStorage.setItem('selected', title)
    let data = {
      title,
      url: link,
      langs,
      isPublic,
      token,
      indent,
      defaultLang
    }

    let arr: any[] = JSON.parse(localStorage.getItem('config') as string)
    arr.push(data)
    localStorage.setItem('config', JSON.stringify(arr))
    selected = title
    storage = arr
    isOpen = false
  }

  const fetchUrl = (link) => fetch(link).then(r => r.json()).catch((e) => warning = e)

  function fetchGithubUrl(link, token) {
    const headers = new Headers({'Authorization': `token ${token}`});
    return fetch(link, { method: 'GET', headers})
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

<div class="outline p-3 mb-3 d-flex flex-column justify-content-center align-items-center">
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
  <button on:click={submitGithub} type="button" class="btn btn-primary w-auto">Import</button>
  {#if warning}
    <div class="warning p-3 mb-3 mt-3">
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

  .warning {
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: #F9D8D8;
    text-align: center;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #404142;
  }
</style>