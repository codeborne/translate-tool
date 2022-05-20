<script lang="ts">
  import {slide} from 'svelte/transition'

  export let title: string
  export let text: string
</script>


<div class="d-flex flex-row justify-content-between mb-3 p-3 gap-5 alert card shadow" transition:slide|local>
  <div>
    <h5 class="card-title mb-3 mb-lg-4"><i class="fa-solid fa-circle-info"></i> {title}</h5>
    <p>{text}</p>
  </div>
</div>