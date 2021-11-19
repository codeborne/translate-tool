<script lang="ts">
  export let isOpen: boolean
  export let url: string
  export let token: string = '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'
  export let langs: Record<string, any>
  let warning = ''
  let username: string = 'Uptaker'
  let repo: string = 'access-token-test'
  let structure: string = '/i18n'

  async function submitPublic() {
    warning = ''
    if (url) {
      let dict = fetchUrl(url)
      if (validate(dict)) {
        langs = dict
        saveToLocalStorage(url, true)
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
      console.log('all valid')
      let dictUrl = `https://api.github.com/repos/${username}/${repo}/contents${structure}/langs.json`
      let dict = await fetchGithubUrl(dictUrl, token)
      dict = JSON.parse(atob(dict.content)) // content is base64 encoded and required decoding
      if (validate(dict)) {
        langs = dict
        saveToLocalStorage(dictUrl, false)
        isOpen = false
        warning = ''
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
    localStorage.clear()
    let data = {
      url: link,
      langs,
      isPublic
    }
    localStorage.setItem('data', JSON.stringify(data))
  }

  const fetchUrl = (link) => fetch(link).then(r => r.json()).catch((e) => warning = e)

  function fetchGithubUrl(link, token) {
    const headers = new Headers({
      'Authorization': `token ${token}`,
    });
    return fetch(link, {
      method: 'GET',
      headers,
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.text() as string)
      }}).catch((err) => warning = err)
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


<div class="container outline p-3 mb-3">
  <h5 class="mb-4">Import a public dictionary</h5>
  <div class="mb-3" >
    <label for="url" class="form-label">Public configuration link</label>
    <input type="text" placeholder="url link" bind:value={url} class="form-control" aria-describedby="url">
    <div id="url" class="form-text">You can change it at any time.</div>
    <div>Example link: '../../i18n/langs.json'</div>
    <button on:click={submitPublic} type="button" class="btn btn-primary">Import</button>
  {warning}
    </div>
</div>

<div class="container outline p-3 mb-3">
  <h5 class="mb-4">Import a private dictionary via GitHub</h5>
  <div class="mb-3" >
    <label for="url" class="form-label">Repository owner's username</label>
    <input type="text" placeholder="repo owner" bind:value={username} class="form-control" aria-describedby="url">
    <div class="form-text mb-4">eg. <b>codeborne</b> for <i>https://github.com/<b>codeborne</b></i></div>

    <label for="url" class="form-label">Repository name</label>
    <input type="text" placeholder="repo name" bind:value={repo} class="form-control" aria-describedby="url">
    <div class="form-text mb-4">eg. <b>translate-tool</b> for <i>https://github.com/codeborne/<b>translate-tool</b></i></div>

    <label for="url" class="form-label">Project location</label>
    <input type="text" placeholder="project structure" bind:value={structure} class="form-control" aria-describedby="url">
    <div class="form-text mb-4">Where the project is located within the root repository. eg <b>/i18n</b> or <b>/i18n/merchant</b></div>


    <label for="url" class="form-label">Authorization token</label>
    <input type="text" placeholder="auth token" bind:value={token} class="form-control" aria-describedby="url">
    <div class="form-text mb-4">This token will be used to access the private repository</div>
  </div>
  <button on:click={submitGithub} type="button" class="btn btn-primary">Import</button>
  {warning}
</div>

<style>
  .outline {
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: white;
  }
  h1, h2, h3, h4, h5, h6 {
    color: #404142;
  }
</style>