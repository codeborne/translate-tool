<script lang="ts">

  import type {LoadedProject, Project} from '../common/Project'
  import {createEventDispatcher} from 'svelte'
  import {GitHubClient} from '../github/GitHubClient'
  import Icon from '../components/Icon.svelte'

  export let token = ''
  export let projects: Project[]

  let warning: string
  let username = ''
  let repo = ''
  let path = '/i18n/'
  let title = ''
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
    const githubClient = new GitHubClient(project)
    const langs: LoadedProject = await githubClient.getFileContent('langs.json')
    if (!langs) warning = 'Could not load project'
    else validate(langs)
    if (warning == '') save()
  }

  function save() {
    if (!localStorage.getItem('projects')) {
      localStorage.clear()
      localStorage.setItem('projects', JSON.stringify([]))
    }
    if (!localStorage.getItem('selectedProject')) localStorage.setItem('selectedProject', title)

    const newProjects: any[] = JSON.parse(localStorage.getItem('projects') as string)
    newProjects.push(project)
    localStorage.setItem('projects', JSON.stringify(newProjects))
    projects = newProjects
    dispatch('changed')
  }

  function validate(arr: any) {
    return !arr ? warning = 'Invalid file' : !Array.isArray(arr) ? warning = 'Must be an array' : warning = ''
  }
</script>

<form id="addPrivate" class="d-flex flex-column"
      on:submit|preventDefault={submit}>
  <h5 class="card-title mb-3 mb-lg-4">Import dictionary from GitHub</h5>
    <label class="form-label">Project name</label>
    <input type="text" bind:value={title} class="form-control" required>
    <div class="form-text mb-4">You can change it at any time.</div>

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
    <div class="form-text mb-4">This token will be used to access or create commits. Create one under the GitHub account which owns the repository.</div>

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
