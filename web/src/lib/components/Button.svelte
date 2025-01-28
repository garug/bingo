<script lang="ts">
  let {
    children,
    onclick = undefined,
    variant = "primary",
    ...rest
  } = $props();
</script>

<button
  {onclick}
  {...rest}
  class={[
    variant,
    "w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
  ]}
>
  {@render children()}
</button>

<style lang="postcss">
  .primary {
    @apply bg-pink-600 text-white hover:bg-pink-700 focus:bg-pink-700;
  }

  .secondary {
    @apply bg-gray-100 text-gray-600 hover:bg-gray-200 focus:bg-gray-200;
  }

  .green {
    @apply bg-green-500 text-gray-900 hover:text-pink-500 focus:text-pink-500;
  }
</style>
