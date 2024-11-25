<script lang="ts">
  import Auth from "$lib/components/Auth.svelte";
  import { auth } from "$lib/stores/auth.svelte";
  import "../app.css";
  import { page } from "$app/stores"
  import Header from "$lib/components/Header.svelte";

  let { children, data } = $props();

  if (data.credential) auth.credential = data.credential;
</script>

<div class="app">
  {#if $page.url.pathname !== "/game"}
    <!-- <Auth /> -->
     <Header />
  {/if}

  <main>
    {@render children()}
  </main>
</div>
