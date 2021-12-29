<script lang="ts">
  import SimpleProjectImporter from './SimpleProjectImporter.svelte'
  import GitHubProjectImporter from './GitHubProjectImporter.svelte'
  import {createEventDispatcher} from 'svelte'
  import type {Project} from '../common/Project'

  export let projects: Project[]

  const dispatch = createEventDispatcher()

  const onChanged = () => dispatch('changed')


</script>

<div class="accordion addNew">

    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target=".collapseGithub" aria-expanded="false" aria-controls="collapseThree">
          Via GitHub
        </button>
      </h2>
      <div class="accordion-collapse collapse m-3 collapseGithub" aria-labelledby="headingThree" data-bs-parent=".addNew">
        <GitHubProjectImporter bind:projects on:changed={onChanged}/>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target=".collapsePublic" aria-expanded="false" aria-controls="collapseThree">
          Via Public URL
        </button>
      </h2>
      <div class="accordion-collapse collapse show m-3 collapsePublic" aria-labelledby="headingThree" data-bs-parent=".addNew">
        <SimpleProjectImporter bind:projects on:changed={onChanged}/>
      </div>
    </div>

</div>
