<script lang="ts">
  import SimpleProjectImporter from './SimpleProjectImporter.svelte'
  import GitHubProjectImporter from './GitHubProjectImporter.svelte'
  import BitBucketProjectImporter from './BitBucketProjectImporter.svelte'
  import Accordion from './Accordion.svelte'
  import {SvelteComponent} from 'svelte'

  interface Accordion {
    message: string,
    className: string,
    slot: SvelteComponent,
    isOpen?: boolean
  }

  let importers: Accordion[] = [
    { message: 'Via GitHub', className: 'githubImport', slot: GitHubProjectImporter },
    { message: 'Via BitBucket', className: 'bitbucketImport', slot: BitBucketProjectImporter },
    { message: 'Via Public URL', className: 'publicImport', isOpen: true, slot: SimpleProjectImporter },
  ] as Accordion[]

  function toggle(e) {
    importers.forEach(i => i.isOpen = i.className === e.detail && i.isOpen !== true)
    importers = importers
  }

</script>

<div class="accordion addNew fix-width mx-auto">
  <h3 class="mb-3">New project</h3>

  {#each importers as importer}
    <Accordion on:toggle={toggle}
      message={importer.message} className={importer.className} isOpen={importer.isOpen}>
      <svelte:component this={importer.slot} />
    </Accordion>
  {/each}

</div>
