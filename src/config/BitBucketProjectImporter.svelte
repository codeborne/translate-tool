<svelte:options accessors/>
<script lang="ts">

  import type {Project} from '../common/Project'
  import {ProjectSource} from '../common/Project'
  import {createEventDispatcher} from 'svelte'
  import {BitBucketClient} from '../bitbucket/BitBucketClient'
  import Icon from '../components/Icon.svelte'
  import SpinnerIcon from '../components/SpinnerIcon.svelte'
  import {ensureInputIsArray} from '../common/utils'

  let warning: string
  let username = ''
  let repo = ''
  let path = ''
  let defaultBranch = ''
  let branch = 'translations'
  let loading = false


  export let project: Project = {url: '', title: '', token: '', indent: 2, branch, source: ProjectSource.BitBucket}

  const dispatch = createEventDispatcher()

  async function submit() {
    try {
      loading = true
      warning = ''
      project.branch = branch ?? 'translations'
      project.url = `https://api.bitbucket.org/2.0/repositories/${username}/${repo}/src/${defaultBranch}${path}`
      let bitbucketClient = new BitBucketClient(project)
      const langs: string[] = await bitbucketClient.getFileContent('langs.json') as string[]
      if (!langs) throw Error('Could not load project')
      else if (ensureInputIsArray(langs)) dispatch('imported', project)
    } catch (e) {
      warning = 'Could not import: ' + e.message
      loading = false
    }
  }
</script>

<form id="addPrivate" class="d-flex flex-column"
      on:submit|preventDefault={submit}>
    <h5 class="card-title mb-3 mb-lg-4">Import dictionary from BitBucket</h5>
    <label class="form-label">Project name</label>
    <input type="text" bind:value={project.title} class="form-control" required>
    <div class="form-text mb-4">You can change it at any time.</div>

    <label class="form-label">Repository owner</label>
    <input type="text" bind:value={username} class="form-control" required>
    <div class="form-text mb-4">eg. <b>account-name</b> for <i>https://bitbucket.org/<b>account-name</b>/</i></div>

    <label class="form-label">Repository name</label>
    <input type="text" bind:value={repo} class="form-control" required>
    <div class="form-text mb-4">eg. <b>myrepo</b> for <i>https://bitbucket.org/account-name/<b>myrepo</b>/</i></div>

    <label class="form-label">Base branch</label>
    <input type="text" bind:value={defaultBranch} class="form-control" required>
    <div class="form-text mb-4">Default branch to pull from if no translations branch exists,
      eg <b>main</b> for <i>https://bitbucket.org/account-name/myrepo/src/<b>main</b>/i18n/langs.json</i></div>

    <label class="form-label">Path within repository</label>
    <input type="text" bind:value={path} class="form-control" pattern="/.*/" required>
    <div class="form-text mb-4">Where the project is located within the root repository,
      eg <b>/i18n/</b> for <i>https://bitbucket.org/account-name/myrepo/src/main<b>/i18n/</b>langs.json</i></div>

    <label class="form-label">Personal auth token</label>
    <input type="text" bind:value={project.token} pattern=".+:.+" class="form-control">
    <div class="form-text mb-4">This token will be used to access or create commits. Create one under BitBucket's <b>Workspace settings > OAuth Consumers</b>
      and combine the <b>Key</b> and <b>Secret</b> to be <b>Key:Secret</b>, eg <i>KB42ebc8rt64b0k9MV:kud7Nsklf93JK2lsKnNs2kNfgXA2n</i>
    </div>

    <label class="form-label">Translations branch</label>
    <input type="text" bind:value={branch} class="form-control" required>
    <div class="form-text mb-4">Where the tool will commit changes</div>
  <div>
    <button disabled={loading} class="btn btn-primary btn-icon w-auto px-lg-4 justify-content-center">
      {#if loading} <SpinnerIcon/> {:else} <Icon class="me-lg-2" name="fileImport"/> {/if}
      Import
    </button>
  </div>
  {#if warning}
    <div class="alert alert-warning mt-3">
      {warning}
    </div>
  {/if}
</form>
