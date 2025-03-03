<script lang="ts">
  import Button from "$lib/components/Button.svelte";

  const { data } = $props();
</script>

<h1>Seus jogos:</h1>

<table>
  <tbody>
    {#each data.games as game}
      <tr>
        <td>{game.ref}</td>
        <td><a href={`admin/${game.ref}`}>go to game</a></td>
      </tr>
    {/each}
  </tbody>
</table>

<a href="/">Home</a>
