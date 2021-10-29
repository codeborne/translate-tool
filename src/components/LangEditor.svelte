<script lang="ts">
  export let lang: string

  let dict: Record<string, any>
  $: fetch(`/i18n/${lang}.json`).then(r => r.json()).then(r => dict = r)
</script>

<div>

  --LangEditor--<br/>

  {lang}

  {JSON.stringify(dict)}

</div>