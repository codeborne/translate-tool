<script lang="ts">

  export let title: string
  export let value: string
  export let original: string

</script>
<tr>
  <td>{title}</td>
  <td><input value={value} placeholder={value}/></td>
  <td>{original}</td>
</tr>

<style>

input {
  width: 90%;
}

</style>