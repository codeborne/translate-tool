<script lang="ts">
  import SimpleProjectImporter from './SimpleProjectImporter.svelte'
  import GitHubProjectImporter from './GitHubProjectImporter.svelte'

  export let projects

</script>
<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target=".addNew" aria-expanded="false" aria-controls="addNew">
  <i class="fas fa-plus-square"></i> Add a new project
</button>

<div class="collapse mt-3 addNew">
  <div class="accordion importTypes d-flex gap-2">

    <div class="card">
      <div class="card-body">
        <h5 class="card-title">How importing works</h5>
        <h6 class="card-subtitle mb-2 text-muted">Your project must have a specific file structure to be compatible with this tool</h6>
        <p class="card-text">Usage documentation under construction</p>
      </div>
    </div>

    <div class="w-100">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target=".collapseGithub" aria-expanded="false" aria-controls="collapseThree">
            Via GitHub
          </button>
        </h2>
        <div class="accordion-collapse collapse m-3 collapseGithub" aria-labelledby="headingThree" data-bs-parent=".importTypes">
          <GitHubProjectImporter bind:projects on:changed/>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target=".collapsePublic" aria-expanded="false" aria-controls="collapseThree">
            Via Public URL
          </button>
        </h2>
        <div class="accordion-collapse collapse show m-3 collapsePublic" aria-labelledby="headingThree" data-bs-parent=".importTypes">
          <SimpleProjectImporter bind:projects on:changed/>
        </div>
      </div>
    </div>

  </div>
</div>
