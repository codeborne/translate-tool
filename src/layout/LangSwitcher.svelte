<script lang="ts">
  import type {LoadedProject} from '../common/Project'
  import localProjectStore from '../common/LocalProjectStore'

  export let project: LoadedProject
  export let lang: string = localProjectStore.getLang() ?? project.langs[0]

  $: if (!project.dicts[lang]) {
    lang = project.langs[0]
    localProjectStore.setLang(lang)
  }

  $: if (lang) localProjectStore.setLang(lang)

</script>

<select bind:value={lang} class="form-select w-auto shadow-sm">
  {#each project.langs as l}
    <option>{l}</option>
  {/each}
</select>
