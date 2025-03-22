<script lang="ts">
  import type { ActionResult } from "@sveltejs/kit";
  import { toasts } from "svelte-toasts";

  import { applyAction, enhance } from "$app/forms";
  import Auth from "$lib/components/Auth.svelte";
  import Button from "$lib/components/Button.svelte";
  import Dialog from "$lib/components/Dialog.svelte";
  import logo from "$lib/images/logo.png";

  import { user } from "$lib/stores/auth.svelte";

  let newGameDialog: ReturnType<typeof Dialog>;
  let enterDialog: ReturnType<typeof Dialog>;

  let { form } = $props();

  let isLoading = $state(false);

  async function handleAction() {
    isLoading = true;

    return async ({ result }: { result: ActionResult }) => {
      isLoading = false;

      newGameDialog.close();

      if (result.type === "failure") {
        toasts.add({
          type: "error",
          title: "Erro ao criar jogo",
          description:
            result.data?.error === "game_already_exists"
              ? "Nome já utilizado, escolha outro"
              : result.data?.error,
          duration: 0,
        });
      }
      await applyAction(result);
    };
  }

  async function handleJoin() {
    isLoading = true;

    return async ({ result }: { result: ActionResult }) => {
      isLoading = false;

      enterDialog.close();

      if (result.type === "failure") {
        toasts.add({
          type: "error",
          title: "Error joining game",
          description: result.data?.error || "Unkwon error",
          duration: 0,
        });
      }
      await applyAction(result);
    };
  }
</script>

<Dialog bind:this={newGameDialog}>
  <form
    inert={isLoading}
    method="POST"
    action="/game"
    use:enhance={handleAction}
  >
    <div class="p-4">
      <label class="block mb-2 text-sm text-slate-600">
        Nomeie sua sala
        <input
          name="password"
          type="text"
          required
          class="w-full text-sm border bordr-slate-200 rounded-md px-3 py-2 shadow-sm focus:outline-none"
        />
        {#if form?.password?.error}
          <span
            class="flex items-center font-medium text-red-500 text-xs mt-1 ml-1"
          >
            Nome é obrigatório
          </span>
        {/if}
      </label>
      <p>
        Escolha um nome que faça sentido para você, algo como "natal família" ou
        "bingo do trabalho"
      </p>
      <p>Esse nome não será utilizado para identificação por outras pessoas</p>
      <p>Você não conseguirá criar outra sala com o mesmo nome.</p>
    </div>
    <div class="bg-gray-50 px-4 py-2 text-right">
      <Button>{isLoading ? "Carregando..." : "Iniciar"}</Button>
      <Button
        preventDefault
        variant="secondary"
        onclick={() => newGameDialog.close()}
      >
        Cancelar
      </Button>
    </div>
  </form>
</Dialog>

<Dialog bind:this={enterDialog}>
  <form
    inert={isLoading}
    method="POST"
    action="game/join"
    use:enhance={handleJoin}
  >
    <div class="p-4">
      <label class="block mb-2 text-sm text-slate-600">
        Código da Sala
        <input
          name="code"
          type="text"
          required
          class="w-full text-sm border bordr-slate-200 rounded-md px-3 py-2 shadow-sm focus:outline-none"
        />
      </label>
      <p>Peça ao seu anfitrião o código para poder se juntar ao sorteio</p>
    </div>
    <div class="bg-gray-50 px-4 py-2 text-right">
      <Button>{isLoading ? "Carregando..." : "Entrar"}</Button>
      <Button
        preventDefault
        variant="secondary"
        onclick={() => enterDialog.close()}
      >
        Cancelar
      </Button>
    </div>
  </form>
</Dialog>

<div
  class="min-h-screen flex justify-center items-center flex-col gap-4 space-y-2"
>
  <img class="w-72" alt="Logo_Bingo" src={logo} />
  {#if $user}
    <div class="flex items-center flex-col gap-2">
      <p class="text-gray-500 flex items-center gap-2">
        Olá {$user.given_name}
      </p>
      <div class="flex gap-1">
        <button
          onclick={() => newGameDialog.open()}
          class="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-pink-600 text-white hover:bg-pink-700 focus:outline-none focus:bg-pink-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          Novo Bingo
        </button>
        <button
          onclick={() => enterDialog.open()}
          class="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
        >
          Entrar em Sala
        </button>
      </div>
      <div class="flex gap-2 justify-center text-xs font-medium text-gray-300">
        <a href="admin">Administrar</a>
        •
        <a href="present/oi">Apresentar</a>
      </div>
    </div>
  {:else}
    <Auth></Auth>
  {/if}
</div>
