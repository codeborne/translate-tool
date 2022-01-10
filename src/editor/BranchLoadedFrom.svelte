<script>
  export let config
</script>

{#if config.url.includes('api.github.com')}
  <div class="form-text">
    <i class="fas fa-code-branch"></i>
    Translations loaded from <b>{config.branch ? config.branch : 'translations'}</b> branch
  </div>
{/if}