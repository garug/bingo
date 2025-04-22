<script lang="ts">
    import type { ActionResult } from "@sveltejs/kit";
    import { applyAction, enhance } from "$app/forms";
    import { Toaster } from "@skeletonlabs/skeleton-svelte";
    import Button from "$lib/components/Button.svelte";
    import ButtonGoogle from "$lib/components/ButtonGoogle.svelte";
    import { user } from "$lib/stores/auth.svelte";
    import { toaster } from "$lib/stores/toast.svelte";
    import { isLoading } from "$lib/stores/loading.svelte.js";

    const { data } = $props();

    function handleSubmit() {
        isLoading.set(true);
        return async ({ result }: { result: ActionResult }) => {
            isLoading.set(false);
            if (result.type === "failure") {
                toaster.error({
                    title: result.data?.error || result.data,
                });
            }
            await applyAction(result);
        };
    }
</script>

<Toaster {toaster}></Toaster>

<div
    class="grid gap-4 place-content-center w-screen h-screen justify-items-center"
>
    <h1 class="h1">Bingo</h1>

    {#if $user}
        <p>Bem vindo, {$user.given_name}</p>
        <form
            method="POST"
            use:enhance={handleSubmit}
            class="flex flex-col gap-2"
        >
            <input
                class="input px-4 py-2 text-2xl"
                type="text"
                name="code"
                placeholder="Código da partida"
            />
            <Button formaction="?/join">Entrar na sala</Button>
            <Button class="expanded" variant="secondary" formaction="?/new">
                Criar nova
            </Button>
        </form>
        <h1>Seus jogos:</h1>

        <table>
            <tbody>
                {#each data.games as game}
                    <tr>
                        <td>{game.ref}</td>
                        <td><a href={`admin/${game.ref}`}>go to game</a></td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <p>É necessário estar logado para jogar</p>
        <ButtonGoogle />
    {/if}
</div>
