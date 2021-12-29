<script lang="ts">

  export let showConfig: boolean

  let icon: string = 'fa-plus-circle'

  export function addProject() {
    this.dispatchEvent(new Event('show', {bubbles: true}))
    showConfig = true
    if (icon.includes('plus')) icon = 'fa-edit'
    else icon = 'fa-plus-circle'
  }

</script>

<button on:click={addProject} class="btn btn-primary" type="button">
  <i class="fas {icon}"></i>
</button>