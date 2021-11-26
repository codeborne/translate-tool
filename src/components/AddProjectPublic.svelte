<script lang="ts">

  export let isOpen: boolean
  export let token: string = '' //TODO remove
  export let projects: any[]
  export let selectedProject: string

  let url: string = ''
  let langs: Record<string, any>
  let title: string = 'Example Public'
  let indent: number = 2
  let defaultLang: string = 'en'

  let warning = ''
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


  function saveToLocalStorage(link: string, isPublic: boolean) {
    if (!localStorage.getItem('projects')) {
      localStorage.clear()
      localStorage.setItem('projects', JSON.stringify([]))
    }
    if (!localStorage.getItem('selectedProject')) localStorage.setItem('selectedProject', title)
    let data = {
      title,
      url: link,
      langs,
      isPublic,
      token,
      indent,
      defaultLang
    }
    let arr: any[] = JSON.parse(localStorage.getItem('projects') as string)
    arr.push(data)
    localStorage.setItem('projects', JSON.stringify(arr))
    selectedProject = title
    projects = arr
    isOpen = false
  }

  const fetchUrl = (link) => fetch(link).then(r => r.json()).catch((e) => warning = e)

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
  <h5 class="mb-4">Import a public dictionary</h5>
  <div class="mb-3">
    <label for="url" class="form-label">Project name</label>
    <input type="text" placeholder="project name" bind:value={title} class="form-control" aria-describedby="url">
    <div class="form-text mb-4"><i>You can change it at any time.</i></div>

    <label for="url" class="form-label">Public configuration link</label>
    <input type="text" placeholder="url link" bind:value={url} class="form-control" aria-describedby="url">
    <div id="url" class="form-text mb-4">You can change it at any time. Example link: <i>../../i18n/langs.json</i></div>
  </div>
  <button on:click={submitPublic} type="button" class="btn btn-primary w-auto">Import</button>
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