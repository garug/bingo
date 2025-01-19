<script lang="ts">
  import type { ActionResult } from "@sveltejs/kit";
  import { applyAction, enhance } from "$app/forms";
  import Auth from "$lib/components/Auth.svelte";
  import Button from "$lib/components/Button.svelte";
  import Dialog from "$lib/components/Dialog.svelte";
  import logo from "$lib/images/logo.png";

  import { user } from "$lib/stores/auth.svelte";

  let newGameDialog: ReturnType<typeof Dialog>;
  let enterDialog: ReturnType<typeof Dialog>;

  let createForm: HTMLFormElement;

  let { form } = $props();

  let isLoading = $state(false);

  async function handleAction() {
    isLoading = true;

    return async ({ result }: { result: ActionResult }) => {
      isLoading = false;
      await applyAction(result);
    };
  }
</script>

<Dialog bind:this={newGameDialog}>
  <form
    inert={isLoading}
    bind:this={createForm}
    method="POST"
    action="/game"
    use:enhance={handleAction}
  >
    <div class="p-4">
      <label class="block mb-2 text-sm text-slate-600">
        Senha da Sala
        <input
          name="password"
          type="password"
          required
          class="w-full text-sm border bordr-slate-200 rounded-md px-3 py-2 shadow-sm focus:outline-none"
        />
        {#if form?.password?.error}
          <span
            class="flex items-center font-medium text-red-500 text-xs mt-1 ml-1"
          >
            Senha é obrigatória
          </span>
        {/if}
      </label>
      <p>
        A senha é utilizada para acessar as funções como sortear novo número e
        cadastrar fichas impressas na mesa.
      </p>
    </div>
    <div class="bg-gray-50 px-4 py-2 text-right">
      <Button>{isLoading ? "Loading..." : "Iniciar"}</Button>
      <Button variant="secondary" onclick={() => newGameDialog.close()}>
        Cancelar
      </Button>
    </div>
  </form>
</Dialog>

<Dialog bind:this={enterDialog}>
  <h1>Olá entrar</h1>
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
        <a href="admin/oi">Administrar</a>
        •
        <a href="present/oi">Apresentar</a>
      </div>
    </div>
  {:else}
    <Auth></Auth>
  {/if}
</div>
