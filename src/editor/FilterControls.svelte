<script lang="ts">
  import Filter from './Filter'
  import KeyFilter from './KeyFilter.svelte'
  import ShowEmptyKeyFilter from './ShowEmptyKeyFilter.svelte'

  export let filter: Filter
</script>

<KeyFilter bind:filter={filter.search}/>
<ShowEmptyKeyFilter bind:showEmptyValuesOnly={filter.showEmptyValuesOnly}/>
