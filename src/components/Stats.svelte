<script lang="ts">
  export let totalDict
  export let filledDict
  export let indent
  export let defaultLang
  export let totalLangs

</script>

<div class="w-100 outline p-3">
  <h5 class="mb-4">Stats</h5>
  <div class="d-flex gap-3">
    <table class="table">
      <tbody>
      <tr>
        <td>Total Fields</td>
        <td>{totalDict}</td>
      </tr>
      <tr>
        <td>Filled fields</td>
        <td>{filledDict}</td>
      </tr>
      <tr>
        <td>Empty Fields</td>
        <td>{totalDict - filledDict}</td>
      </tr>
      </tbody>
    </table>
    <table class="table">
      <tbody>
      <tr>
        <td>Default Language</td>
        <td>{defaultLang}</td>
      </tr>
      <tr>
        <td>Total Languages</td>
        <td>{totalLangs}</td>
      </tr>
      <tr>
        <td>JSON Indent</td>
        <td>{indent}</td>
      </tr>
      </tbody>
    </table>
  </div>
</div>

<style>
  .outline {
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: white;
  }
  h1, h2, h3, h4, h5, h6 {
    color: #404142;
  }
</style>