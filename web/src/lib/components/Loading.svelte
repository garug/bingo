<script lang="ts">
    import { isLoading } from "$lib/stores/loading.svelte";
</script>

{#if $isLoading}
    <div id="loading" class="background">
        <span class="spinner"></span>
    </div>
{/if}

<style lang="postcss">
    @reference "../../app.css";

    .background {
        @apply fixed inset-0 grid place-content-center bg-surface-950/50 backdrop-blur-xs z-50;
    }

    .spinner {
        @apply animate-spin h-10 w-10 border-4 border-secondary-500 border-t-transparent rounded-full;
    }
</style>
