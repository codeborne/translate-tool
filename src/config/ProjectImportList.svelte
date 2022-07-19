<script lang="ts">
  import SimpleProjectImporter from './SimpleProjectImporter.svelte'
  import GitHubProjectImporter from './GitHubProjectImporter.svelte'
  import BitBucketProjectImporter from './BitBucketProjectImporter.svelte'
  import Accordion from './Accordion.svelte'
  import {SvelteComponent} from 'svelte'
  import {fly} from 'svelte/transition'
  import Card from '../components/Card.svelte'

  interface Accordion {
    heading: string,
    className: string,
    slot: SvelteComponent,
    isOpen?: boolean
  }

  let importers: Accordion[] = [
    { heading: 'Via GitHub', className: 'githubImport', slot: GitHubProjectImporter },
    { heading: 'Via BitBucket', className: 'bitbucketImport', slot: BitBucketProjectImporter },
    { heading: 'Via Public URL', className: 'publicImport', isOpen: true, slot: SimpleProjectImporter },
  ] as Accordion[]

  function toggle(e) {
    importers.forEach(i => i.isOpen = i.className === e.detail && i.isOpen !== true)
    importers = importers
  }

</script>
<div class="accordion addNew fix-width mx-auto" in:fly={{x: -200, duration: 200}}>

  <h3 class="mb-3">New project</h3>
  <Card flex padding="px-4 py-3" class="mb-3">
    <div>
      <h5><i class="fa-solid fa-circle-info mb-3 me-2"></i>Quickstart</h5>
      <p>Make sure to acquaint yourself with the desired <a target="_blank" href="https://github.com/codeborne/translate-tool#using-the-tool">file structure</a></p>
      <p>A working example project can be found <a target="_blank" href="https://github.com/codeborne/translate-tool/tree/master/e2e/i18n">here</a></p>
    </div>
  </Card>

  {#each importers as importer}
    <Accordion on:toggle={toggle}
      heading={importer.heading} className={importer.className} isOpen={importer.isOpen}>
      <svelte:component this={importer.slot} on:imported />
    </Accordion>
  {/each}
</div>
