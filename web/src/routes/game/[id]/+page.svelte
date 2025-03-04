<script lang="ts">
  const { data } = $props();

  const card = $state(data.session.card.numbers);
  const cardNumber = $state(data.session.session.ref);
</script>

<h1>Seu cartão: {cardNumber}</h1>
<div class="grid grid-cols-5 w-fit">
  {#each card as number}
    <div class="block w-[50px] h-[50px]">{number}</div>
  {/each}
</div>

<a href="/">Início</a>
