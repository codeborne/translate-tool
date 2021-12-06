<script lang="ts">
  import type {LoadedProject} from '../common/Project'

  export let project: LoadedProject
  export let lang: string
</script>

<select bind:value={lang} class="form-select w-auto me-3">
  {#each Object.keys(project.dicts) as l}
    <option>{l}</option>
  {/each}
</select>
