<script lang="ts">
  import {fade} from 'svelte/transition'
</script>

<div class="d-flex justify-content-center align-center {$$props.class ?? ''}" in:fade={{delay: 50}}>
  <div class="spinner-border"></div>
</div>
