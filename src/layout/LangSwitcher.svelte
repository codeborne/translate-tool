<script lang="ts">
  import type {LoadedProject} from '../common/Project'

  export let project: LoadedProject
  export let lang: string = localStorage.getItem('selectedLanguage') ?? project.langs[0]

  $: if (!project.dicts[lang]) {
    lang = project.langs[0]
    localStorage.setItem('selectedLanguage', lang)
  }

  $: if (lang) localStorage.setItem('selectedLanguage', lang)

</script>

<select bind:value={lang} class="form-select w-auto">
  {#each project.langs as l}
    <option>{l}</option>
  {/each}
</select>
