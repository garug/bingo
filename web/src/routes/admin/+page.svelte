<script lang="ts">
  import Button from "$lib/components/Button.svelte";

  const { data } = $props();
</script>

<h1>Your games:</h1>

<table>
  <tbody>
    {#each data.games as game}
      <tr>
        <td>{game.ref}</td>
        <td><Button>go to game</Button></td>
      </tr>
    {/each}
  </tbody>
</table>
