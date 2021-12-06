<script lang="ts">
  import type {Project} from '../common/Project'

  export let projects: Project[]

  let showEditor: boolean = false
  let selectedTitle: string
  let title: string
  let indent: number

  function deleteProject() {
    projects = projects.filter(obj => obj.title !== selectedTitle)
    localStorage.setItem('projects', JSON.stringify(projects))
  }

  function toggleForm() {
    showEditor = !showEditor
  }

  function editProject() {
    let project: Record<string, any> = projects.find(obj => obj.title === selectedTitle)
    let filteredStorage: any[] = projects.filter(obj => obj.title !== selectedTitle)
    project.title = title
    project.indent = indent as number
    filteredStorage.push(project)
    localStorage.setItem('projects', JSON.stringify(filteredStorage))
    projects = filteredStorage
    toggleForm()
  }

  function setFormInputs() {
    let project = projects.find(obj => obj.title === selectedTitle)
    title = project.title
    indent = project.indent
  }

  $: if (selectedTitle) setFormInputs()
</script>

<div class="card p-3 mb-3 d-flex flex-column justify-content-center align-items-center">
  <h5 class="card-title">Manage Projects</h5>

  <div class="card-body" >
      <select bind:value={selectedTitle} class="form-select" aria-label="Select project">
        {#each projects as p }
          <option value={p.title}>{p.title}</option>
        {/each}
      </select>
  </div>

  {#if showEditor}
    <div class="d-flex flex-column justify-content-center align-items-center">
      <label class="form-label">Project name</label>
      <input type="text" placeholder="project name" bind:value={title} class="form-control mb-4">

      <label class="form-label">Indent spaces</label>
      <input type="number" placeholder="space indent" bind:value={indent} class="form-control mb-4">
    </div>
    <div class="d-flex gap-5 mt-3">
      <button on:click={toggleForm} type="button" class="btn btn-primary w-auto">Cancel</button>
      <button on:click={editProject} type="button" class="btn btn-primary w-auto">Save</button>
    </div>
  {:else}
    <div class="d-flex gap-5 mt-3">
      <button on:click={toggleForm} type="button" class="btn btn-primary w-auto">Edit</button>
      <button on:click={deleteProject} type="button" class="btn btn-danger w-auto">Delete</button>
    </div>
  {/if}
</div>
