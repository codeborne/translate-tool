<script lang="ts">
  import type {Project} from '../common/Project'
  import {createEventDispatcher} from 'svelte'
  import {encodeBase64Unicode} from '../common/utils'
  import Icon from '../components/Icon.svelte'

  export let projects: Project[]
  export let selectedProject: Project

  let title: string
  let indent: number
  let url: string
  let token: string
  let branch: string

  const dispatch = createEventDispatcher()

  function deleteProject() {
    if (!confirm(`Are you sure you want to delete the project: ${selectedProject.title}?`)) return
    projects = projects.filter(obj => obj.title !== selectedProject.title)
    localStorage.setItem('projects', JSON.stringify(projects))
    dispatch('changed')
  }

  function setSelectedProjectValues() {
    selectedProject.title = title
    selectedProject.indent = indent as number
    selectedProject.token = token
    selectedProject.url = url
    if (branch) selectedProject.branch = branch
  }

  function editProject() {
    let filteredStorage: Project[] = projects.filter(obj => obj.title !== selectedProject.title)
    setSelectedProjectValues()
    rewriteProjectLists(filteredStorage)
  }

  function rewriteProjectLists(filteredStorage: Project[]) {
    filteredStorage.push(selectedProject)
    localStorage.setItem('projects', JSON.stringify(filteredStorage))
    projects = filteredStorage
    dispatch('changed')
  }

  function shareProject() {
    const siteUrl: string = window.location.origin
    const encodedProject: string = encodeBase64Unicode(JSON.stringify(selectedProject))
    prompt(`Share the project using the following url:`, `${siteUrl}/?shared=${encodedProject}`)
  }

  function setFormInputs() {
    title = selectedProject.title
    indent = selectedProject.indent
    url = selectedProject.url
    token = selectedProject.token
    branch = (selectedProject.branch) ? selectedProject.branch : 'translations'
  }

  function isVersionControl(): boolean {
    return selectedProject.url.includes('api.github.com')
      || selectedProject.url.includes('api.bitbucket.org')
  }

  $: if (selectedProject) setFormInputs()
</script>

<div class="card p-3 p-lg-4 my-3 my-lg-4 d-flex flex-column justify-content-center align-items-center shadow rounded-3">
  <h3 class="card-title">Manage Project</h3>
  <div class="card-body w-50" >
    <div class="d-flex flex-column justify-content-center">
      <label class="form-label">Project name</label>
      <input type="text" placeholder="Project name" bind:value={title} class="form-control mb-4 name-input">

      <label class="form-label">Indent spaces</label>
      <input type="number" placeholder="Space indent" bind:value={indent} class="form-control mb-4 indent-input">

      <label class="form-label">URL</label>
      <input type="text" placeholder="Project url" bind:value={url} class="form-control mb-4 url-input">

      <label class="form-label">Access Token</label>
      <input type="text" placeholder="In case a token is required to access the url" bind:value={token} class="form-control mb-4 token-input">

      {#if isVersionControl()}
        <label class="form-label">Branch</label>
        <input type="text" placeholder="Translations branch" bind:value={branch} class="form-control">
        <div class="form-text mb-4">Specified branch will be created automatically during commit. Default branch if not set is <b>translations</b></div>

      {/if}
    </div>
    <div class="d-flex justify-content-between gap-5 mt-3">
      <button on:click={deleteProject} type="button" class="btn px-lg-4 btn-danger btn-icon"><Icon class="me-2" name="trashBin"/>Delete project</button>
      <button on:click={shareProject} type="button" class="btn px-lg-4 btn-secondary btn-icon"><Icon class="me-2" name="share"/>Share</button>
      <button on:click={editProject} type="button" class="btn px-lg-4 btn-primary btn-icon"><Icon class="me-2" name="floppyDisk"/>Save changes</button>
    </div>
  </div>
</div>
