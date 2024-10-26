<script lang="ts">
  import Header from "./Header.svelte";
  import "../app.css";
  import { client_id } from "$lib/google";

  let { children } = $props();
</script>

<svelte:head>
  <script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

<div class="app">
  <Header />
  <div
    id="g_id_onload"
    data-client_id={client_id}
    data-context="signin"
    data-ux_mode="popup"
    data-login_uri="/_auth"
    data-auto_select="true"
    data-close_on_tap_outside="false"
    data-itp_support="true"
  ></div>

  <div
    class="g_id_signin"
    data-type="standard"
    data-shape="rectangular"
    data-theme="outline"
    data-text="signin"
    data-size="large"
    data-logo_alignment="left"
  ></div>

  <main>
	{@render children()}
  </main>

  <footer>
    <p>
      visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to learn
      about SvelteKit
    </p>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>
