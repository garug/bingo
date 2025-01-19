<script lang="ts">
  import Number from "$lib/card/number.svelte";
  const numbersUser = Array.from({ length: 25 }).map((e, i) => i + 1);
  const numbersSorted = [2, 3, 8];
  const cardUser = {
    id: 1,
    name: "Sara",
  };

  let isToggled = $state(false);
</script>

<div class="mt-8 flex flex-col justify-center items-center space-y-2">
  <h2 class="text-2xl font-bold text-pink-500">Olá, {cardUser.name}!</h2>
  <h4 class="text-xl font-bold text-pink-500">Ficha #{cardUser.id}</h4>
</div>

<div class="flex justify-center items-center mt-8">
  <div class="justify-center flex flex-wrap gap-3 p-4">
    {#each numbersUser as number}
      <Number value={number} active={numbersSorted.includes(number)} />
    {/each}
  </div>
</div>

<!-- <div class="flex justify-center items-center space-x-8 mt-8">
  <p class="text-xm font-semibold text-pink">Marcação Automática</p>
  <div class="flex items-center justify-center">
    <button
      class="relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 bg-pink"
      onclick={() => (isToggled = !isToggled)}
      class:bg-blue-500={isToggled}
      class:bg-gray-300={!isToggled}
    >
      <div
        class="top-0 absolute w-6 h-6 bg-white rounded-full shadow transition-transform duration-300"
        class:translate-x-6={isToggled}
      ></div>
    </button>
  </div>
</div> -->

<!-- Botões -->
<!-- <div class="flex justify-center p-8 space-x-16 mt-8">
  <button
    class=" cursor-pointer w-[200px] bg-neongreen text-black rounded-full
    font-semibold p-4 hover:opacity-80">Conferir Jogo</button
  >
</div> -->

<div class="mt-8 flex flex-col justify-center items-center space-y-2">
  <h3 class="text-xl font-bold text-pink-500">Últimos números sorteados</h3>
  <div class="justify-center flex gap-3 p-4">
    {#each numbersSorted.splice(1).toReversed() as number}
      <div class="number">
        {number}
      </div>
    {/each}
  </div>
</div>
