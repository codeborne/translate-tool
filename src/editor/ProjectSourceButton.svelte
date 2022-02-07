<script lang="ts">
  import type {Project} from '../common/Project'
  import {GitHubClient} from '../github/GitHubClient'
  import {BitBucketClient} from '../bitbucket/BitBucketClient'
  import Icon from '../components/Icon.svelte'

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
    const repoInfo: string[] = project.url.slice(project.url.indexOf('/repos/') + 7, project.url.indexOf('/contents')).split('/')
    const path: string = project.url.slice(project.url.indexOf('/contents/') + 9, project.url.length)
    url = `https://github.com/${repoInfo[0]}/${repoInfo[1]}/blob/${defaultBranch}${path}${lang}.json`
  }

  function parseBitbucket() {
    const suffix: string = project.url.slice(project.url.indexOf(`/src/`) + 5, project.url.length)
    const branchFromUrl: string =  suffix.slice(0, suffix.indexOf('/'))
    const repoInfo: string[] = project.url
      .slice(project.url.indexOf('/repositories/') + 14, project.url.indexOf('/src/'))
      .split('/')
    const path: string = project.url.slice(project.url.indexOf(`/${branchFromUrl}/`) + branchFromUrl.length + 2)
    url = `https://bitbucket.org/${repoInfo[0]}/${repoInfo[1]}/src/${defaultBranch}/${path}${lang}.json`
  }

  function parseNormal() {
    url = `${project.url}${lang}.json`
  }
</script>

<a href={url} target="_blank" class="btn btn-secondary w-auto btn-icon sourceBtn me-md-3 me-lg-4">
  <Icon name="link"/> Source
</a>
