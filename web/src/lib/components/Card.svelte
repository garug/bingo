<script lang="ts">
    const numbers = Array.from({ length: 90}).map((e, i) => i + 1)
</script>



<div class="flex flex-col items-stretch min-h-screen">
    <!-- TODO v-if state.session, verificar disponibilidade -->
    <div class="flex justify-between items-center px-4 py-4 flex-1">
        <p class="text-center flex-1 text-2xl font-bold">Últimos números</p>
        {#each Array(5) as number}
            <div
                class="number-container flex flex-1 items-center justify-center"
            >
                <!-- TODO v-if="[...state.session.sortedNumbers].reverse()[number - 1]" -->
                <p class="number-block h-full">o que eh isso?</p>
            </div>
        {/each}
    </div>
    <!-- TODO somente mostrar com sessão, verificar necessidade -->
    
</div>
