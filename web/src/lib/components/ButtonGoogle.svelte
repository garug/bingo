<script lang="ts">
    import { invalidate } from "$app/navigation";
    import { credential, user } from "$lib/stores/auth.svelte";
    import { isLoading } from "$lib/stores/loading.svelte";

    let googleButton = $state() as HTMLButtonElement;

    async function callback(r: google.accounts.id.CredentialResponse) {
        isLoading.set(true);

        await fetch("/cookies", {
            method: "POST",
            body: JSON.stringify({
                name: "credential",
                value: r.credential,
                maxAge: 60 * 60 * 1,
            }),
        });

        await invalidate((url) => url.href.includes("api"));

        credential.set(r.credential);
        isLoading.set(false);
    }

    function handleLogin() {
        google.accounts.id.prompt();
    }

    function onload() {
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback,
        });

        google.accounts.id.renderButton(googleButton, {
            type: "standard",
        });
    }
</script>

<svelte:head>
    <script
        src="https://accounts.google.com/gsi/client"
        async
        {onload}
    ></script>
</svelte:head>

<button
    onclick={handleLogin}
    aria-label="google login"
    bind:this={googleButton}
    data-credential={JSON.stringify(user)}
>
</button>
