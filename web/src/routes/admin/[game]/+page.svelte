<script lang="ts">
  import AllNumbers from "$lib/components/AllNumbers.svelte";
  import Button from "$lib/components/Button.svelte";
  import { game } from "$lib/stores/game.svelte";
  import { socket } from "$lib/socket.svelte.js";
  import { onMount } from "svelte";

  const { data } = $props();

  let numbersSorted = $state(data.numbers);

  let onSorting = $state(false);

  const card = [
    {
      name: "Sara",
    },
    {
      id: 2,
      name: "Garug",
    },
    {
      id: 3,
      name: "João",
    },
  ];

  onMount(() => {
    socket.on(data.id, (number) => {
      numbersSorted = [...numbersSorted, number];
      onSorting = false;
    });
  });

  async function sortNumber() {
    onSorting = true;

    fetch(`/api/game/${data.id}/numbers`, {
      method: "POST",
    });
  }
</script>

<!-- Fichas Cadastradas -->
<!-- <div class="mt-8 flex flex-col justify-center items-center space-y-4">
  <h1 class="text-3xl font-bold text-pink">Fichas Cadastradas</h1>
  <div class="flex-row space-y-4 w-[500px] p-16">
    {#each card as c}
      <div class="flex justify-between gap-4 bg-hotpinkligth rounded-lg p-4">
        <p class="text-pink font-semibold">Ficha #{c.id}</p>
        <p class="text-pink font-semibold">{c.name}</p>
      </div>
    {/each}
  </div>
</div> -->

<!-- Sorteados  -->
<AllNumbers {numbersSorted} />

<!-- Botões -->
<div class="flex justify-center gap-4 m-8">
  <!-- <button
    class=" h-[-20px] cursor-pointer w-[200px] bg-pink text-white rounded-full
    font-semibold p-4 hover:text-neongreen">Ler Ficha</button
  > -->
  <p>Code: {data.game.game_code}</p>
  <Button onclick={sortNumber} variant="green" disabled={onSorting}>
    {#if onSorting}
      Sorteando...
    {:else}
      Sortear Número
    {/if}
  </Button>
</div>
