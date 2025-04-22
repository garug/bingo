<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
        variant?: "secondary";
        [key: string]: unknown;
    }

    let { children, variant, ...others }: Props = $props();
</script>

<button
    class={variant === "secondary"
        ? "btn preset-outlined-surface-200-800"
        : "btn preset-filled-primary-500"}
    {...others}
>
    {@render children()}
</button>
