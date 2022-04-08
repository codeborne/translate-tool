<script lang="ts">
  export let message
</script>

<div class="accordion-item shadow mb-3 rounded-3 overflow-hidden">
  <h2 class="accordion-header">
    <button class="accordion-button p-lg-4 collapsed githubImport" type="button" data-bs-toggle="collapse"
            data-bs-target=".collapseGithub" aria-expanded="false" aria-controls="collapseThree">
      {message}
    </button>
  </h2>
  <div class="accordion-collapse collapse m-3 m-lg-4 collapseGithub" aria-labelledby="headingThree"
       data-bs-parent=".addNew">
    <slot/>
  </div>
</div>