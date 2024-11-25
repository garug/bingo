<script lang="ts">
  import logo from "$lib/images/logo.png";
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <div
    class="min-h-screen flex justify-center items-center flex-col gap-4 space-y-2"
  >
    <img class="w-72" alt="Logo_Bingo" src={logo} />
    <input
      type="text"
      placeholder="Nome da sua sala"
      class="w-[200px] rounded px-4 py-2 border border-pink peer-focus:after:border-pink outline-pink placeholder-hotpink"
    />
    <div class="flex flex-col gap-4">
      <a href="admin/oi">
        <button
          type="submit"
          class="w-[200px] bg-pink from-blue-500 to-blue-600 hover:opacity-90 hover:text-neongreen text-white font-semibold px-6 py-3 rounded-xl shadow-md"
        >
          Iniciar Sorteio
        </button>
      </a>
      <a href="game/oi/user/oi">
        <button
          type="button"
          class="w-[200px] bg-pink from-blue-500 to-blue-600 text-white
        hover:opacity-90 hover:text-neongreen font-semibold px-6 py-3 rounded-xl shadow-md"
        >
          Conectar a Sala
        </button>
      </a>
    </div>
  </div>
</section>
