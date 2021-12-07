<script lang="ts">
  import type {LoadedProject} from '../common/Project'

  export let project: LoadedProject
  export let lang: string = project.langs[0]
</script>

<select bind:value={lang} class="form-select w-auto me-3">
  {#each project.langs as l}
    <option>{l}</option>
  {/each}
</select>
