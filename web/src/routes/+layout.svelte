<script lang="ts">
  import Auth from "$lib/components/Auth.svelte";
  import { auth } from "$lib/stores/auth.svelte";
  import "../app.css";

  let { children, data } = $props();

  if (data.credential) auth.credential = data.credential;
</script>

<div class="app">
  <Auth />
  
  <main>
    {@render children()}
  </main>
</div>
