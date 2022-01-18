<script lang="ts">

  import type {LoadedProject, Project} from '../common/Project'
  import {createEventDispatcher} from 'svelte'
  import {BitBucketClient} from '../bitbucket/BitBucketClient'

  export let token: string = ''
  export let projects: Project[]

  let warning: string
  let username: string = ''
  let repo: string = ''
  let path: string = ''
  let title: string = ''
  let branch = 'translations'
  let project: Project = {url: '', title: '', token: '', indent: 2, branch}

  const dispatch = createEventDispatcher()

  function setProjectKeys() {
    warning = ''
    project.title = title
    project.token = token
    project.indent = 2
    project.branch = branch ?? 'translations'
    project.url = `https://api.bitbucket.org/2.0/repositories/${username}/${repo}/src/main${path}`
  }

  async function submit() {
    setProjectKeys()
    let bitbucketClient = new BitBucketClient(project)
    let langs: LoadedProject = await bitbucketClient.getFile('langs.json')
    if (!langs)  warning = 'Could not load project'
    else validate(langs)
    if (warning == '') save()
  }

  function save() {
    if (!localStorage.getItem('projects')) {
      localStorage.clear()
      localStorage.setItem('projects', JSON.stringify([]))
    }
    if (!localStorage.getItem('selectedProject')) localStorage.setItem('selectedProject', title)

    let newProjects: any[] = JSON.parse(localStorage.getItem('projects') as string)
    newProjects.push(project)
    localStorage.setItem('projects', JSON.stringify(newProjects))
    projects = newProjects
    dispatch('changed')
  }

  function validate(arr: any) {
    return !arr ? warning = 'Invalid file' : !Array.isArray(arr) ? warning = 'Must be an array' : warning = ''
  }
</script>

<form id="addPrivate" class="card p-3 mb-3 d-flex flex-column justify-content-center align-items-center"
      on:submit|preventDefault={submit}>
  <h5 class="card-title">Import a private dictionary from BitBucket repository</h5>
  <div class="card-body w-75">
    <label class="form-label">Project name</label>
    <input type="text" bind:value={title} class="form-control" required>
    <div class="form-text mb-4"><i>You can change it at any time.</i></div>

    <label class="form-label">Repository owner</label>
    <input type="text" bind:value={username} class="form-control" required>
    <div class="form-text mb-4">eg. <b>account-name</b> for <i>https://bitbucket.org/<b>account-name</b>/</i></div>

    <label class="form-label">Repository name</label>
    <input type="text" bind:value={repo} class="form-control" required>
    <div class="form-text mb-4">eg. <b>myrepo</b> for <i>https://bitbucket.org/account-name/<b>myrepo</b>/</i></div>

    <label class="form-label">Path within repository</label>
    <input type="text" bind:value={path} class="form-control" pattern="/.*/" required>
    <div class="form-text mb-4">Where the project is located within the root repository,
      eg <b>/i18n/</b> for <i>https://bitbucket.org/account-name/myrepo/src/main<b>/i18n/</b>langs.json</i></div>

    <label class="form-label">Personal auth token</label>
    <input type="text" bind:value={token} class="form-control">
    <div class="form-text mb-4">This token will be used to access the private repository</div>

    <label class="form-label">Translations branch</label>
    <input type="text" bind:value={branch} class="form-control" required>
    <div class="form-text mb-4">Where the tool will commit changes</div>
  </div>

  <button class="btn btn-primary w-auto">Import</button>
  {#if warning}
    <div class="alert alert-warning mt-3">
      {warning}
    </div>
  {/if}
</form>
