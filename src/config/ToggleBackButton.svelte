<script lang="ts">
  import Icon from '.././components/Icon.svelte'

  export let showConfig: boolean
  export let showAddProject: boolean
  export let showBack: boolean
</script>

{#if showBack}
  <div>
      <button type="button" class="btn-circle mb-3 mt-md-n1 backBtn" on:click={() => showConfig = showAddProject = false}>
        <Icon name="arrowLeft"/>
      </button>
  </div>
{/if}

<style>

  @media (min-width: 992px) {

    .mt-md-n1 {
      margin-top: -0.5rem;
    }
  }

  .btn-circle {
    color: var(--primary);
    padding: 0.7rem;
    border-radius: 500rem;
    display: flex;
    border: none;
    background: var(--primary-lightest);
    filter: brightness(0.97) saturate(1);
    transition: filter ease-in 0.2s, color ease-in 0.2s;
  }

  .btn-circle:hover {
    color: var(--primary-accent);
    filter: brightness(0.95) saturate(2);
  }

  .btn-circle:active {
    color: var(--primary-accent);
    filter: brightness(0.9) saturate(2);
  }

</style>
