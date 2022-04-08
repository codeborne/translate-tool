<script lang="ts">
  import {createEventDispatcher} from 'svelte'
  import {slide} from 'svelte/transition'

  export let message
  export let className
  export let isOpen = false

  const dispatch = createEventDispatcher()

  const toggle = () => dispatch('toggle')
  const open = () => isOpen = !isOpen

</script>

<div class="shadow mb-3 rounded-3 overflow-hidden">

  <h2 class="accordion-header">
    <button on:click={open} class:collapsed={!isOpen} class="accordion-button p-lg-4 collapsed {className}" type="button">
      {message}
    </button>
  </h2>

  {#if isOpen}
    <div class:collapse={!isOpen} transition:slide class="collapsed accordion-content m-3 m-lg-4">
      <slot />
    </div>
  {/if}

</div>