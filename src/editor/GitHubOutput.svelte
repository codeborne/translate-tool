<script lang="ts">
  import {Dict, Project} from '../common/Project'
  import {GitHubClient} from '../common/JsonLoader'

  export let dict: Dict
  export let config: Project

  async function push() {
    const client = new GitHubClient(config)
    const result = await client.saveProject(dict)
    alert('Saved to ' + result.ref)
  }
</script>

<div class="mt-3 card p-3">
  <div class="d-flex justify-content-between mb-3">
    <button on:click={push} class="btn btn-primary w-auto">Save to <i>translations</i> branch <i class="fas fa-save"></i></button>
    <a class="btn btn-primary" href="#top">Jump to top</a>
  </div>
</div>
