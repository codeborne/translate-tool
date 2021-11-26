<script lang="ts">
  import ProjectSettings from "./ProjectSettings.svelte";
  import AddPublicProject from "./AddPublicProject.svelte";
  import AddPrivateProject from "./AddPrivateProject.svelte";

  export let isOpen: boolean
  export let projects: any[]
  export let selectedProject: string

</script>
{#if projects.length > 0}
  <ProjectSettings bind:projects />
{/if}
<AddPublicProject bind:projects bind:isOpen bind:selectedProject />
<AddPrivateProject bind:projects bind:isOpen bind:selectedProject />

<style>
  .outline {
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: white;
  }

  .warning {
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: #F9D8D8;
    text-align: center;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #404142;
  }
</style>