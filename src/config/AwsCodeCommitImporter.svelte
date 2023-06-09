<svelte:options accessors/>

<script lang="ts">
  import SpinnerIcon from '../components/SpinnerIcon.svelte'
  import Icon from '../components/Icon.svelte'
  import {createEventDispatcher} from 'svelte'
  import {ensureInputIsArray} from '../common/utils'
  import type {AwsProject} from '../common/Project'
  import {ProjectSource} from '../common/Project'
  import {AwsCodeCommitClient} from '../awscodecommit/AwsCodeCommitClient'

  let loading = false
  let warning = ''
  let project: AwsProject = {
    title: '',
    url: '',
    indent: 2,
    region: '',
    accessKeyId: '',
    secretAccessKey: '',
    sessionToken: '',
    branch: 'translations',
    translationsPath: '/i18n/',
    source: ProjectSource.AwsCodeCommit
  }

  const dispatch = createEventDispatcher()

  async function submit() {
    try {
      loading = true
      warning = ''

      let client = new AwsCodeCommitClient(project)

      const langs: string[] = await client.getFileContent('langs.json') as string[]
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
  <h5 class="card-title mb-3 mb-lg-4">Import dictionary from AWS CodeCommit</h5>
  <label class="form-label">Project title</label>
  <input type="text" bind:value={project.title} class="form-control" required>
  <div class="form-text mb-4">You can change it at any time.</div>

  <label class="form-label">Repository name</label>
  <input type="text" bind:value={project.url} class="form-control" required>

  <label class="form-label">AWS region</label>
  <input type="text" bind:value={project.region} class="form-control" required>
  <div class="form-text mb-4">eg. <b>eu-central-1</b></div>

  <label class="form-label">AWS Access Key ID</label>
  <input type="text" bind:value={project.accessKeyId} class="form-control" required>
  <div class="form-text mb-4">Your personal access key</div>

  <label class="form-label">AWS Secret Access Key</label>
  <input type="text" bind:value={project.secretAccessKey} class="form-control" required>
  <div class="form-text mb-4">Your personal secret</div>

  <label class="form-label">AWS Session Token (optional)</label>
  <input type="text" bind:value={project.sessionToken} class="form-control" required>
  <div class="form-text mb-4">Your personal session token</div>

  <label class="form-label">Path to translations within repository</label>
  <input type="text" bind:value={project.translationsPath} class="form-control" pattern="/.*/" required>
  <div class="form-text mb-4">Where the project is located within the root repository,
    eg <b>/i18n/</b> for <i>/src/main<b>/i18n/</b>langs.json</i></div>

  <label class="form-label">Translations branch</label>
  <input type="text" bind:value={project.branch} class="form-control" required>
  <div class="form-text mb-4">Where the tool will commit changes</div>
  <div>
    <button disabled={loading} class="btn btn-primary btn-icon w-auto px-lg-4 justify-content-center">
      {#if loading}
        <SpinnerIcon/>
      {:else}
        <Icon class="me-lg-2" name="fileImport"/>
      {/if}
      Import
    </button>
  </div>
  {#if warning}
    <div class="alert alert-warning mt-3">
      {warning}
    </div>
  {/if}
</form>