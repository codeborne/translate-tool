<script lang="ts">
  import ObjectInput from "./ObjectInput.svelte";
  import LangSaveButton from "./LangSaveButton.svelte";

  export let lang: string

  let template: Record<string, any>

  let dict: Record<string, any>
  $: if (lang) load(lang)

  function load(lang: string) {
    fetch(`/i18n/${lang}.json`).then(r => r.json()).then(r => dict = r)
  }
</script>

<div>
  <h3>Currently editing: {lang}</h3>

  <br>
  {#if dict != undefined}
    <ObjectInput dict={dict}/>
    <LangSaveButton/>

    <br>
    <h3>RAW output:</h3>
    <pre>
      {JSON.stringify(dict)}
    </pre>
  {/if}

</div>