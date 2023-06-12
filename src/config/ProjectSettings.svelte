<script lang="ts">
  import type {AwsProject, Project} from '../common/Project'
  import {ProjectSource} from '../common/Project'
  import {createEventDispatcher} from 'svelte'
  import {encodeBase64Unicode} from '../common/utils'
  import Icon from '../components/Icon.svelte'
  import localProjectStore from '../common/LocalProjectStore'
  import ConfigClipboardOutput from './ConfigClipboardOutput.svelte'
  import Card from '../components/Card.svelte'

  export let projects: Project[]
  export let selectedProject: Project
  export let newProjectSettings: Project

  const dispatch = createEventDispatcher()

  function deleteProject() {
    if (!confirm(`Are you sure you want to delete the project: ${selectedProject.title}?`)) return
    projects = projects.filter(obj => obj.title !== selectedProject.title)
    localProjectStore.setProjects(projects)
    dispatch('deleted')
  }

  function setSelectedProjectValues() {
    for (const key of Object.keys(newProjectSettings)) {
      selectedProject[key] = newProjectSettings[key]
    }
  }

  function editProject() {
    let filteredStorage: Project[] = projects.filter(obj => obj.title !== selectedProject.title)
    setSelectedProjectValues()
    rewriteProjectLists(filteredStorage)
  }

  function rewriteProjectLists(filteredStorage: Project[]) {
    filteredStorage.push(selectedProject)
    localProjectStore.setProjects(filteredStorage)
    projects = filteredStorage
    dispatch('changed', selectedProject)
  }

  function shareProject() {
    const siteUrl: string = window.location.origin
    const encodedProject: string = encodeBase64Unicode(JSON.stringify(selectedProject))
    prompt(`Share the project using the following url:`, `${siteUrl}/?shared=${encodedProject}`)
  }

  function setFormInputs() {
    newProjectSettings = JSON.parse(JSON.stringify(selectedProject))
    newProjectSettings.branch = (newProjectSettings.branch) ? newProjectSettings.branch : 'translations'
  }

  function isVersionControl(): boolean {
    return selectedProject?.source !== ProjectSource.SimpleProject
  }

  $: if (selectedProject) setFormInputs()

  $: awsNewProjectSettings = newProjectSettings as AwsProject
</script>

<Card>
  <h3 class="card-title">Manage Project</h3>
  <div class="d-flex flex-column justify-content-center w-100">
    <label class="form-label">Project name</label>
    <input type="text" placeholder="Project name" bind:value={newProjectSettings.title} class="form-control mb-3 mb-md-4 name-input">

    <label class="form-label">Indent spaces</label>
    <input type="number" placeholder="Space indent" bind:value={newProjectSettings.indent} class="form-control mb-3 mb-md-4 indent-input">

    <label class="form-label">URL</label>
    <input type="text" placeholder="Project url" bind:value={newProjectSettings.url} class="form-control mb-3 mb-md-4 url-input">

    <label class="form-label">Access Token</label>
    <input type="text" placeholder="In case a token is required to access the url" bind:value={newProjectSettings.token} class="form-control mb-4 token-input">

    {#if isVersionControl()}
      <label class="form-label">Branch</label>
      <input type="text" placeholder="Translations branch" bind:value={newProjectSettings.branch} class="form-control">
      <div class="form-text mb-4">Specified branch will be created automatically during commit. Default branch if not set is <b>translations</b></div>
    {/if}

    {#if newProjectSettings.source === ProjectSource.AwsCodeCommit}
      <label class="form-label">Source branch</label>
      <input placeholder="Source branch" bind:value={awsNewProjectSettings.sourceBranch} class="form-control mb-3 mb-md-4 indent-input">

      <label class="form-label">Region</label>
      <input placeholder="Region" bind:value={awsNewProjectSettings.region} class="form-control mb-3 mb-md-4 indent-input">

      <label class="form-label">AWS Access Key ID</label>
      <input placeholder="AWS Access Key ID" bind:value={awsNewProjectSettings.accessKeyId} class="form-control mb-3 mb-md-4 indent-input">

      <label class="form-label">AWS Secret Access Key</label>
      <input placeholder="AWS Secret Access Key" bind:value={awsNewProjectSettings.secretAccessKey} class="form-control mb-3 mb-md-4 indent-input">

      <label class="form-label">AWS session token</label>
      <input placeholder="AWS session token" bind:value={awsNewProjectSettings.sessionToken} class="form-control mb-3 mb-md-4 indent-input">
    {/if}

    <div class="d-grid d-md-flex flex-column flex-md-row justify-content-md-between gap-4 mt-md-3">
      <button on:click={deleteProject} type="button" class="btn btn-danger btn-icon order-3 order-md-1 deleteBtn"><Icon class="me-2" name="trashBin"/>Delete project</button>
      <button on:click={shareProject} type="button" class="btn btn-secondary btn-icon order-1 shareBtn"><Icon class="me-2" name="share"/>Share</button>
      <button on:click={editProject} type="button" class="btn btn-primary btn-icon order-2 mt-3 mt-md-0 editBtn"><Icon class="me-2" name="floppyDisk"/>Save changes</button>
    </div>
  </div>
</Card>

{#if selectedProject}
  <Card class="mt-4">
    <ConfigClipboardOutput config={selectedProject}/>
  </Card>
{/if}
