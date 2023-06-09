<script lang="ts">
  import type {Project} from '../common/Project'
  import Icon from '../components/Icon.svelte'
  import {clientFor} from '../common/VersionControlClient'

  export let project: Project
  export let defaultBranch
  export let lang

  $: url = clientFor(project).getSourceUrl(defaultBranch, lang)
</script>

<a href={url} target="_blank" class="btn btn-secondary w-auto btn-icon sourceBtn">
  <Icon name="link"/> Source
</a>
