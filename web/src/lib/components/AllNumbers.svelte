<script lang="ts">
  import Number from "$lib/card/number.svelte";

  const numbers = Array.from({ length: 90 }).map((e, i) => i + 1);

  const { numbersSorted } = $props();
</script>

<div class="justify-center flex flex-wrap gap-3 p-4">
  {#each numbers as number}
    <Number value={number} active={numbersSorted.includes(number)} />
  {/each}
</div>
