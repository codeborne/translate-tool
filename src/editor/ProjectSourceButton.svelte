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
  $: if (defaultBranch) setUrl()

  function setUrl() {
    if (project.url.includes(GitHubClient.host)) parseGithub()
    else if (project.url.includes(BitBucketClient.host)) parseBitbucket()
    else parseNormal()
  }

  function parseGithub() {
    const repoInfo = project.url.slice(project.url.indexOf('/repos/') + 7, project.url.indexOf('/contents')).split('/')
    const path = project.url.slice(project.url.indexOf('/contents/') + 9, project.url.length)
    url = `https://github.com/${repoInfo[0]}/${repoInfo[1]}/blob/${defaultBranch}${path}${lang}.json`
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