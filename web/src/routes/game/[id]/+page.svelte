<script lang="ts">
  import { onMount } from "svelte";

  import Number from "$lib/card/number.svelte";
  import { socket } from "$lib/socket.svelte.js";

  const { data } = $props();

  const card = $state(data.session.card.numbers);
  const cardNumber = $state(data.session.session.ref);

  let numbersSorted = $state(data.game.numbers);

  onMount(() => {
    socket.on(data.game.game.id, (number: number) => {
      numbersSorted = [...numbersSorted, number];
    });
  });
</script>

<h1>Seu cartão: {cardNumber}</h1>
<div class="grid p-2 grid-cols-5 gap-2 w-fit">
  {#each card as number}
    <Number value={number} active={numbersSorted.includes(number)} />
  {/each}
</div>

<a href="/">Início</a>
