<script lang="ts">
  export let projects: any[]

  let showEditor: boolean = false
  let select: string
  let title: string
  let indent: number
  let defaultLang: string

  function deleteProject() {
    projects = projects.filter(obj => obj.title !== select)
    localStorage.setItem('projects', JSON.stringify(projects))
  }

  function toggleForm() {
    showEditor = !showEditor
  }

  function editProject() {
    let project: Record<string, any> = projects.find(obj => obj.title === select)
    let filteredStorage: any[] = projects.filter(obj => obj.title !== select)
    project.title = title
    project.indent = indent as number
    project.defaultLang = defaultLang
    filteredStorage.push(project)
    localStorage.setItem('projects', JSON.stringify(filteredStorage))
    projects = filteredStorage
    toggleForm()
  }

  function setFormInputs() {
    let project = projects.find(obj => obj.title === select)
    title = project.title
    indent = project.indent
    defaultLang = project.defaultLang
  }

  $: if (select) setFormInputs()
</script>

<div class="outline p-3 mb-3 d-flex flex-column justify-content-center align-items-center">
  <h5 class="mb-4">Manage Projects</h5>
  <div class="mb-3" >
      <select bind:value={select} class="form-select" aria-label="Select project">
        {#each projects as p }
          <option value="{p.title}">{p.title}</option>
        {/each}
      </select>
  </div>
  {#if showEditor}
    <div class="d-flex flex-column justify-content-center align-items-center">
    <label class="form-label">Project name</label>
    <input type="text" placeholder="project name" bind:value={title} class="form-control mb-4" aria-describedby="url">

    <label class="form-label">Indent spaces</label>
    <input type="number" placeholder="space indent" bind:value={indent} class="form-control mb-4" aria-describedby="url">

    <label class="form-label">Default language</label>
    <input type="text" placeholder="space indent" bind:value={defaultLang} class="form-control" aria-describedby="url">
      <div class="form-text mb-4"><i>May depend on your configuration, eg 'en' for English.</i></div>

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

<style>
  .outline {
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: white;
  }

  .warning {
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: #F9D8D8;
    text-align: center;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #404142;
  }
</style>