<script lang="ts">
  import type { JwtPayload } from "jwt-decode";
  import { jwtDecode } from "jwt-decode";

  let googleButton: HTMLDivElement;

  const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  type CredentialResponse = google.accounts.id.CredentialResponse;

  type TokenInfo = {
    name: string;
  } & JwtPayload;

  function handleCredentialResponse(response: CredentialResponse) {
    const token = jwtDecode<TokenInfo>(response.credential);

    console.log(new Date(token.exp));
    console.log(token.name);
  }

  function onload() {
    google.accounts.id.initialize({
      client_id: client_id,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(googleButton, {
      type: "standard",
    });
  }
</script>

<svelte:head>
  <script src="https://accounts.google.com/gsi/client" async {onload}></script>
</svelte:head>

<div id="g_id_onload" data-auto_prompt="false" data-client_id={client_id}></div>

<div
  class="g_id_signin"
  data-shape="rectangular"
  data-theme="outline"
  data-text="signin_with"
  data-size="large"
  data-logo_alignment="left"
  bind:this={googleButton}
></div>
