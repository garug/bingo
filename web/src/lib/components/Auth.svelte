<script lang="ts">
  import { credential, user } from "$lib/stores/auth.svelte";

  let googleButton = $state() as HTMLButtonElement;

  const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  type CredentialResponse = google.accounts.id.CredentialResponse;

  function bindGoogleButton() {
    google.accounts.id.renderButton(googleButton, {
      type: "standard",
    });
  }

  function storeCredential(credential: string) {
    return fetch("/cookies", {
      method: "POST",
      body: JSON.stringify({
        name: "credential",
        value: credential,
        maxAge: 60 * 60 * 1,
      }),
    });
  }

  function deleteCredential() {
    return fetch("/cookies/credential", {
      method: "DELETE",
    });
  }

  function handleCredentialResponse(response: CredentialResponse) {
    credential.set(response.credential);
    storeCredential(response.credential);
  }

  function onload() {
    google.accounts.id.initialize({
      client_id: client_id,
      callback: handleCredentialResponse,
    });

    $user || bindGoogleButton();
  }

  function handleLogin() {
    google.accounts.id.prompt();
  }

  function revokeToken() {
    credential.set(undefined);

    // TODO botão não está aparecendo após limpar o token local
    deleteCredential();
    // TODO após limpo, o servidor está recebendo o cookie mesmo assim
  }
</script>

<svelte:head>
  <script src="https://accounts.google.com/gsi/client" async {onload}></script>
</svelte:head>

{#if !$user}
  <button
    onclick={handleLogin}
    aria-label="google login"
    bind:this={googleButton}
  >
  </button>
{/if}
