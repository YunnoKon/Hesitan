<script>
    import { createModal } from "../states/PopUpState.svelte"

    let { ext = $bindable() } = $props()
    let today = new Date()
    let days = $derived(Array.from({ length: ext.monthDaysCount }, (_, i) => i + 1));
</script>

<div class="grid grid-cols-10 font-dot gap-5 text-xl">
    {#each days as day}
    <button onclick={() => createModal("DateDetails",{ ext, day })} class="{(day==today.getDate() && ext.month==today.getMonth()) ? "text-orange-500" : ""} hover:font-bold hover:text-black hover:bg-orange-500 rounded-3xl h-12 w-12 hover:cursor-pointer">
        {day}
    </button>
    {/each}
</div>