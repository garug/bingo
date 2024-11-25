<script lang="ts">
  const numbers = Array.from({ length: 90 }).map((e, i) => i + 1);
  const numbersSorted = [24, 8, 74];
  const card = [
    {
      id: 1,
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
</script>

<!-- Fichas Cadastradas -->
<div class="mt-8 flex flex-col justify-center items-center space-y-4">
  <h1 class="text-3xl font-bold text-pink">Fichas Cadastradas</h1>
  <div class="flex-row space-y-4 w-[500px] p-16">
    {#each card as c}
      <div class="flex justify-between gap-4 bg-hotpinkligth rounded-lg p-4">
        <p class="text-pink font-semibold">Ficha #{c.id}</p>
        <p class="text-pink font-semibold">{c.name}</p>
      </div>
    {/each}
  </div>
</div>

<!-- Sorteados  -->
<div class="justify-center flex flex-wrap gap-3 p-4">
  {#each numbers as number}
    <div
      class={`w-[60px] h-[60px] flex justify-center items-center bg-hotpinkligth rounded-xl text-pink font-semibold
        ${numbersSorted.includes(number) && "bg-pink text-white"}`}
    >
      {number}
    </div>
  {/each}
</div>

<!-- Botões -->
<div class="flex justify-center gap-4 m-8">
  <button
    class=" h-[-20px] cursor-pointer w-[200px] bg-pink text-white rounded-full
    font-semibold p-4 hover:text-neongreen">Ler Ficha</button
  >
  <button
    class="cursor-pointer w-[200px] bg-neongreen text-black rounded-full
    font-semibold p-4 hover:text-pink">Sortear Número</button
  >
</div>
