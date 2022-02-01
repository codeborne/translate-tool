<script lang="ts">

  import type {LoadedProject, Project} from '../common/Project'
  import {createEventDispatcher} from 'svelte'
  import {GitHubClient} from '../github/GitHubClient'
  import Icon from '../components/Icon.svelte'

  export let token: string = ''
  export let projects: Project[]

  let warning: string
  let username: string = ''
  let repo: string = ''
  let path: string = '/i18n/'
  let title: string = ''
  let branch = 'translations'
  let project: Project = {url: '', title: '', token: '', indent: 2, branch}

  const dispatch = createEventDispatcher()

  function setProjectKeys() {
    warning = ''
    project.url = `https://api.github.com/repos/${username}/${repo}/contents${path}`
    project.title = title
    project.token = token
    project.indent = 2
    project.branch = branch
  }

  async function submit() {
    setProjectKeys()
    let githubClient = new GitHubClient(project)
    let langs: LoadedProject = await githubClient.getFileContent('langs.json')
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

<form id="addPrivate" class="d-flex flex-column card shadow w-lg-50 mx-lg-auto px-3 px-lg-4 pt-3 pb-4 mb-lg-4"
      on:submit|preventDefault={submit}>
  <h3 class="card-title mb-2 mb-lg-4">Import a private dictionary from GitHub repository</h3>
    <label class="form-label">Project name</label>
    <input type="text" bind:value={title} class="form-control" required>
    <div class="form-text mb-4">You can change it at any time.</div>

    <label class="form-label">Repository owner</label>
    <input type="text" bind:value={username} class="form-control" required>
    <div class="form-text mb-4">eg. <b>codeborne</b> for <b>https://github.com/codeborne</b></div>

    <label class="form-label">Repository name</label>
    <input type="text" bind:value={repo} class="form-control" required>
    <div class="form-text mb-4">eg. <b>translate-tool</b> for <b>https://github.com/codeborne/<b>translate-tool</b></b></div>

    <label class="form-label">Path within repository</label>
    <input type="text" bind:value={path} class="form-control" pattern="/.*/" required>
    <div class="form-text mb-4">Where the project is located within the root repository. eg <b>/i18n/</b></div>

    <label class="form-label">Personal auth token</label>
    <input type="text" bind:value={token} class="form-control">
    <div class="form-text mb-4">This token will be used to access the private repository</div>

    <label class="form-label">Translations branch</label>
    <input type="text" bind:value={branch} class="form-control" required>
    <div class="form-text mb-4">Where the tool will commit changes</div>

  <div>
    <button class="btn btn-primary btn-icon w-auto px-lg-4 justify-content-center">
      <Icon class="me-lg-2" name="fileImport"/>
      Import
    </button>
  </div>
  {#if warning}
    <div class="alert alert-warning mt-3">
      {warning}
    </div>
  {/if}
</form>
