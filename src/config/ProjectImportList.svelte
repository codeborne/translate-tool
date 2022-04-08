<script lang="ts">
  import SimpleProjectImporter from './SimpleProjectImporter.svelte'
  import GitHubProjectImporter from './GitHubProjectImporter.svelte'
  import BitBucketProjectImporter from './BitBucketProjectImporter.svelte'
  import Accordion from './Accordion.svelte'
</script>

<div class="accordion addNew fix-width mx-auto">
  <h3 class="mb-3">New project</h3>

  <Accordion message="Via GitHub" className="githubImport">
    <GitHubProjectImporter on:imported />
  </Accordion>

  <Accordion message="Via BitBucket" className="bitbucketImport">
    <BitBucketProjectImporter on:imported />
  </Accordion>

  <Accordion message="Via Public URL" className="publicImport" isOpen={true} >
    <SimpleProjectImporter on:imported />
  </Accordion>

</div>
