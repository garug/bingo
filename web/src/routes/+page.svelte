<script lang="ts">
  import logo from "$lib/images/logo.png";
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <div class="min-h-screen flex justify-center items-center flex-col gap-4">
    <img class="w-72" alt="Logo_Bingo" src={logo} />
    <input
      type="text"
      placeholder="Nome da sua sala"
      class="rounded px-4 py-3 border border-gray-200 peer-focus:after:border-gray-300 outline-gray-300"
    />
    <div class="flex flex-col gap-2">
      <button
        type="submit"
        class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md"
      >
        Iniciar Sorteio
      </button>
      <button
        type="button"
        class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md"
      >
        Conectar a Sala
      </button>
    </div>
  </div>
</section>
