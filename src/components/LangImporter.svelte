<script lang="ts">
  import ProjectSettings from "./ProjectSettings.svelte";
  import AddProjectPublic from "./AddProjectPublic.svelte";
  import AddProjectFromRepository from "./AddProjectFromRepository.svelte";
  export let isOpen: boolean
  export let storage: any[]
  export let selected: string


</script>
{#if storage.length > 0}
  <ProjectSettings bind:storage />
{/if}
<AddProjectPublic bind:storage bind:isOpen bind:selected />
<AddProjectFromRepository bind:storage bind:isOpen bind:selected />

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