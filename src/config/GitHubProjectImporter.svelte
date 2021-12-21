<script lang="ts">
  import type {Project} from '../common/Project'
  import {LoadedProject} from '../common/Project'
  import {GitHubClient} from '../github/GitHubClient'
  import {createEventDispatcher} from 'svelte'

  export let token: string = ''
  export let projects: Project[]

  let url: string = ''
  let warning: string
  let username: string = ''
  let repo: string = ''
  let path: string = '/i18n/'
  let title: string = ''
  let project: Project = {url: '', title: '', token: '', indent: 2}

  const dispatch = createEventDispatcher()

  async function submit() {
    warning = ''
    // TODO: use GitHubClient
    project.url = `https://api.github.com/repos/${username}/${repo}/contents${path}`
    project.title = title
    project.token = token
    project.indent = 2

    let githubClient = new GitHubClient(project)

    let langs: LoadedProject = await githubClient.getFileContent('langs.json')
    if (!langs) {
      warning = 'Could not load project'
    } else {
      validate(langs)
      if (warning == '') {
        save()
        warning = ''
      }
    }
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
