<script lang="ts">
  type Props = {
    value: number;
    active: boolean;
  };

  let { value, active }: Props = $props();

  const isZero = value === 0;

  // avoiding unnecessary re-renders
  const showNumber = isZero ? "⭐" : value;
</script>

<div class={["number", { active: active || isZero }]}>
  {showNumber}
</div>

<style lang="postcss">
  @reference "../../app.css";

  .number {
    @apply w-[60px] h-[60px] flex justify-center items-center rounded-container font-semibold text-secondary-300;
  }

  .number.active {
    @apply text-secondary-500 bg-surface-900;
  }
</style>
