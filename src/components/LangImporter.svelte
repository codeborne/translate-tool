<script lang="ts">
  export let isOpen: boolean
  export let url: string
  export let githubUrl: string = 'https://api.github.com/repos/Uptaker/access-token-test/contents/i18n/langs.json'
  export let token: string = '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'
  export let langs: Record<string, any>
  let warning = ''

  async function submitPublic() {
    warning = ''
    if (url) {
      let dict = fetchUrl(url)
      if (validate(dict)) {
        langs = dict
        saveToLocalStorage()
        isOpen = false
        warning = ''
      }
    } else {
      warning = 'Input must not be empty'
    }
  }

  async function submitGithub() {
    warning = ''
    if (githubUrl) {
      if (token) {
        console.log('token exists')
        let dict = await fetchGithubUrl(githubUrl, token)
        dict = JSON.parse(atob(dict.content))
        if (validate(dict)) {
          langs = dict
          saveToLocalStorage()
          isOpen = false
          warning = ''
        }
      } else {
          warning = 'Token must not be empty'
        }
    } else {
      warning = 'Link must not be empty'
    }
  }

  function saveToLocalStorage() {
    localStorage.clear()
    let data = {
      url,
      langs,
    }
    localStorage.setItem('data', JSON.stringify(data))
  }

  const fetchUrl = (link) => fetch(link).then(r => r.json()).catch((e) => warning = e)

  function fetchGithubUrl(link, token) {
    const headers = new Headers({
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.VERSION.raw'
    });
    return fetch(githubUrl, {
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


<form class="container">
  <div class="mb-3" >
    <label for="url" class="form-label">Import a custom configuration</label>
    <input type="text" placeholder="url link here" bind:value={url} class="form-control" aria-describedby="url">
    <div id="url" class="form-text">You can change it at any time.</div>
    <div>Example link: '../../i18n/langs.json'</div>
    <button on:click={submitPublic} type="button" class="btn btn-primary">Import</button>

    <br/>
    <br/>
    <label for="url" class="form-label">Import via GitHub</label>
    <input type="text" placeholder="github raw url" bind:value={githubUrl} class="form-control" aria-describedby="url">
    <div>Example link: 'https://raw.githubusercontent.com/Uptaker/access-token-test/main/i18n/langs.json'</div>

    <br/>

    <label for="url" class="form-label">Authorization token</label>
    <input type="text" placeholder="github raw url" bind:value={token} class="form-control" aria-describedby="url">
  </div>
  <button on:click={submitGithub} type="button" class="btn btn-primary">Import</button>
  {warning}
</form>