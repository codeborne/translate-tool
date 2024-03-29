<svelte:options accessors/>
<script lang="ts">
  import type {Project} from '../common/Project'
  import {ProjectSource} from '../common/Project'
  import {createEventDispatcher} from 'svelte'
  import {GitHubClient} from '../github/GitHubClient'
  import Icon from '../components/Icon.svelte'
  import SpinnerIcon from '../components/SpinnerIcon.svelte'
  import {ensureInputIsArray} from '../common/utils'

  let warning: string
  let username = ''
  let repo = ''
  let path = '/i18n/'
  let targetBranch = 'translations'
  let loading = false

  export let project: Project = {url: '', title: '', token: '', indent: 2, branch: targetBranch, source: ProjectSource.Github}

  const dispatch = createEventDispatcher()

  async function submit() {
    try {
      loading = true
      warning = ''
      project.url = `https://api.github.com/repos/${username}/${repo}/contents${path}`
      const githubClient = new GitHubClient(project)
      const langs: string[] = await githubClient.getFileContent('langs.json') as string[]
      if (!langs) throw Error('Could not load project')
      else if (ensureInputIsArray(langs)) await dispatch('imported', project)
    } catch (e) {
      warning = 'Could not import: ' + e.message
      loading = false
    }
  }
</script>

<form id="addPrivate" class="d-flex flex-column"
      on:submit|preventDefault={submit}>
  <h5 class="card-title mb-3 mb-lg-4">Import dictionary from GitHub</h5>
    <label class="form-label">Project name</label>
    <input type="text" bind:value={project.title} class="form-control" required>
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
    <input type="text" bind:value={project.token} class="form-control">
    <div class="form-text mb-4">This token will be used to access or create commits. Create one under the GitHub account which owns the repository.</div>

    <label class="form-label">Translations branch</label>
    <input type="text" bind:value={targetBranch} class="form-control" required>
    <div class="form-text mb-4">Where the tool will commit changes</div>

  <div>
    <button disabled={loading} class="btn btn-primary btn-icon w-auto px-lg-4 justify-content-center">
      {#if loading} <SpinnerIcon/> {:else} <Icon class="me-lg-2" name="fileImport"/> {/if}
      Import
    </button>
  </div>
  {#if warning}
    <div class="alert alert-warning mt-3">{warning}</div>
  {/if}
</form>
