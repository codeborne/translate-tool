<script lang="ts">
  import ObjectInput from "./ObjectInput.svelte";

  export let lang: string

  let dict: Record<string, any>
  $: {
    fetch(`/i18n/${lang}.json`).then(r => r.json()).then(r => dict = r)
    // console.log(dict)
  }
</script>

<div>

  --LangEditor--<br/>

  {lang}

  {JSON.stringify(dict)}
  <br>

  <ObjectInput dict={dict}/>

</div>