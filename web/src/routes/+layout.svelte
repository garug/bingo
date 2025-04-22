<script lang="ts">
    import "../app.css";

    import { afterNavigate, beforeNavigate } from "$app/navigation";

    import { credential } from "$lib/stores/auth.svelte";
    import Loading from "$lib/components/Loading.svelte";
    import { isLoading } from "$lib/stores/loading.svelte";

    let { children, data } = $props();

    if (data.credential) credential.set(data.credential);

    beforeNavigate(() => isLoading.set(true));
    afterNavigate(() => isLoading.set(false));
</script>

<main class="app">
    <Loading />
    {@render children()}
</main>
