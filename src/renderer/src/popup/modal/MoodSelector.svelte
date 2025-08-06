<script>
	let { data = $bindable() } = $props()
    import { PopUpState } from '../../states/PopUpState.svelte'
    import { avaliableMood } from '../../utils';
	
	import Modal from '../Modal.svelte';
</script>

<Modal>
	{#snippet header()}
		<div class="text-2xl font-black">
            Mood Selection
        </div>
	{/snippet}
    <h1 class="mb-2 text-gray-500 italic">What is your daily mood? Click the closest mood</h1>
    <div class="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5">
        {#each Object.entries(avaliableMood) as [mood,emoticon]}
        <button onclick={() => { data.mood = mood; PopUpState.activeModal.pop() }} class="cursor-pointer flex text-lg w-25 h-25 items-center justify-center border-gray-700/60 border-2 rounded-2xl text-white bg-white/5 backdrop-blur-sm hover:border-orange-500/80 transition-all duration-300 group">
            <div class="text-center transition-transform duration-500 ease-out group-hover:scale-105">
                <h1 class="font-dot mb-1 transition-transform duration-500 ease-out group-hover:-rotate-12">{emoticon}</h1>
                <h2 class="text-orange-500 text-lg font-dot font-semibold tracking-wider">{mood}.</h2>
            </div>
        </button>
        {/each}
    </div>

</Modal>