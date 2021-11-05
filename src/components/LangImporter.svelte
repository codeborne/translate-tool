<script lang="ts">
  export let isOpen: boolean
  export let url: string
  let warning = ''

  async function submit() {
    warning = ''
    if (url) {
      let dict = await fetchUrl(url)
      if (validate(dict)) {
        isOpen = false
        warning = ''
      }
    } else {
      warning = 'Input must not be empty'
    }
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


<form class="container">
  <div class="mb-3" >
    <label for="url" class="form-label">Import a custom configuration</label>
    <input type="text" placeholder="url link here" bind:value={url} class="form-control" id="text" aria-describedby="url">
    <div id="url" class="form-text">You can change it at any time.</div>
  </div>
  <button on:click={submit} type="button" class="btn btn-primary">Import</button>
  {warning}

  <div>Example link: '../../i18n/langs.json'</div>
</form>