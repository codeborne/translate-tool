<script lang="ts">

  export let title: string
  export let value: string

</script>

<label>{title}
  <input value={value} placeholder={value}/>
</label>

<style>

  input {
    width: 100%;
  }

  label {
    display: block;
    text-align: left;
    color: black
  }

</style>