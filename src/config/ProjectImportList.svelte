<script lang="ts">
  import SimpleProjectImporter from './SimpleProjectImporter.svelte'
  import GitHubProjectImporter from './GitHubProjectImporter.svelte'
  import BitBucketProjectImporter from './BitBucketProjectImporter.svelte'
  import type {Project} from '../common/Project'

  export let projects: Project[]

</script>

<div class="accordion addNew mt-3 mt-lg-4">

    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button px-lg-4 collapsed githubImport" type="button" data-bs-toggle="collapse" data-bs-target=".collapseGithub" aria-expanded="false" aria-controls="collapseThree">
          Via GitHub
        </button>
      </h2>
      <div class="accordion-collapse collapse m-3 collapseGithub" aria-labelledby="headingThree" data-bs-parent=".addNew">
        <GitHubProjectImporter bind:projects on:changed/>
      </div>
    </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button px-lg-4 collapsed bitbucketImport" type="button" data-bs-toggle="collapse" data-bs-target=".collapseBitbucket" aria-expanded="false" aria-controls="collapseThree">
        Via BitBucket
      </button>
    </h2>
    <div class="accordion-collapse collapse m-3 collapseBitbucket" aria-labelledby="headingThree" data-bs-parent=".addNew">
      <BitBucketProjectImporter bind:projects on:changed/>
    </div>
  </div>

    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button px-lg-4 collapsed publicImport" type="button" data-bs-toggle="collapse" data-bs-target=".collapsePublic" aria-expanded="false" aria-controls="collapseThree">
          Via Public URL
        </button>
      </h2>
      <div class="accordion-collapse collapse show m-3 collapsePublic" aria-labelledby="headingThree" data-bs-parent=".addNew">
        <SimpleProjectImporter bind:projects on:changed/>
      </div>
    </div>

</div>
