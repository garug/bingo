<script lang="ts">
  type Props = {
    value: number;
    active: boolean;
  };

  let { value, active }: Props = $props();
</script>

<div class="number" class:active>
  {value}
</div>

<style lang="postcss">
  .number {
    @apply w-[60px] h-[60px] flex justify-center items-center rounded-xl text-pink-500 font-semibold;
  }

  .number.active {
    @apply bg-pink-700 text-white;
  }
</style>
