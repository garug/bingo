<script lang="ts">
  import type { JwtPayload } from "jwt-decode";

  import { jwtDecode } from "jwt-decode";
  import { auth } from "$lib/stores/auth.svelte";

  let googleButton = $state() as HTMLDivElement;

  const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  type CredentialResponse = google.accounts.id.CredentialResponse;

  type TokenInfo = {
    given_name: string;
  } & JwtPayload;

  function bindGoogleButton() {
    google.accounts.id.renderButton(googleButton, {
      type: "standard",
    });
  }

  function storeCredential(credential: string) {
    return fetch("/api/cookies", {
      method: "POST",
      body: JSON.stringify({
        name: "credential",
        value: credential,
        maxAge: 60 * 60 * 8,
      }),
    });
  }

  function deleteCredential() {
    return fetch("/api/cookies/credential", {
      method: "DELETE",
    });
  }

  function handleCredentialResponse(response: CredentialResponse) {
    auth.credential = response.credential;
    storeCredential(response.credential);
  }

  const user = $derived.by(() => {
    const credential = auth.credential;

    return credential && jwtDecode<TokenInfo>(credential);
  });

  function onload() {
    google.accounts.id.initialize({
      client_id: client_id,
      callback: handleCredentialResponse,
    });

    user || bindGoogleButton();
  }

  function revokeToken() {
    auth.credential = undefined;

    // TODO botão não está aparecendo após limpar o token local
    deleteCredential();
    // TODO após limpo, o servidor está recebendo o cookie mesmo assim
  }
</script>

<svelte:head>
  <script src="https://accounts.google.com/gsi/client" async {onload}></script>
</svelte:head>

<div id="g_id_onload" data-auto_prompt="false" data-client_id={client_id}></div>

<button onclick={revokeToken}>Sair</button>
{#if user}
  <p>Olá, {user.given_name}</p>
{:else}
  <div
    class="g_id_signin"
    data-shape="rectangular"
    data-theme="outline"
    data-text="signin_with"
    data-size="large"
    data-logo_alignment="left"
    bind:this={googleButton}
  ></div>
{/if}
