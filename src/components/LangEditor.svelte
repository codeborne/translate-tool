<script lang="ts">
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

  {#if dict != undefined}
    {#each Object.keys(dict) as value, i}
      {#if typeof dict[value] === 'object' && dict[value] != null}
      <label>{value}
        <input value="this is an object"/>
      </label>
      {:else}
        <label>{value}
          <input value={dict[value]}/>
        </label>
        {/if}

      <br>
    {/each}
  {/if}

</div>