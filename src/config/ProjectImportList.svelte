<script lang="ts">
  import SimpleProjectImporter from './SimpleProjectImporter.svelte'
  import GitHubProjectImporter from './GitHubProjectImporter.svelte'

  export let projects

</script>

<div class="collapse mt-3 addNew">
  <div class="accordion importTypes">

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
