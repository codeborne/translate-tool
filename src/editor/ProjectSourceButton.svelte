<script lang="ts">
  import type {Project} from '../common/Project'
  import {GitHubClient} from '../github/GitHubClient'
  import {BitBucketClient} from '../bitbucket/BitBucketClient'

  export let project: Project
  export let defaultBranch
  export let lang

  let url: string = ''

  $: if (project) setUrl()
  $: if (lang) setUrl()

  function setUrl() {
    if (project.url.includes(GitHubClient.host)) parseGithub()
    else if (project.url.includes(BitBucketClient.host)) parseBitbucket()
    else parseNormal()
  }

  function parseGithub() {

  }

  function parseBitbucket() {

  }

  function parseNormal() {
    url = `${project.url}${lang}.json`
  }
</script>

<a href={url} target="_blank" class="btn btn-primary w-auto sourceBtn">
  <i class="fas fa-link"></i> Source
</a>