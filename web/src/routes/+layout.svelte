<script lang="ts">
  import { credential } from "$lib/stores/auth.svelte";
  import "../app.css";

  let { children, data } = $props();

  if (data.credential) credential.set(data.credential);
</script>

<main class="app">
  <!-- {#if $page.url.pathname !== "/game"}
     <Header />
  {/if} -->
  {@render children()}
</main>
