<script>
	let { data = $bindable() } = $props()
    let path = $state("")
	
	import Modal from '../Modal.svelte';
</script>

<Modal>
	{#snippet header()}
		<h2 class="text-2xl font-black">
			Monitored App List
		</h2>
	{/snippet}
	<div class="flex flex-col gap-3">
        <p class="text-sm italic text-gray-500">Hesitan monitor by checking is the app download location matching the text listed in here</p>
		{#each data as d, i (i)}
        <div class="px-6 py-2 justify-between flex bg-white/6 rounded-lg">
            {d}
            <button onclick={() => { data.splice(i, 1); }} class="text-orange-500 cursor-pointer">
                <img alt="bin" src="delete.svg" class="w-4 h-4"/>
            </button>
        </div>
        {/each}
        <div class="flex gap-2">
            <input bind:value={path} placeholder="Insert path here..." type="text" class="focus:outline-none w-full bg-white/6 rounded-lg py-2 px-6"/>
            <button onclick={() => { data.push(path); path = ""; }} class="font-semibold hover:shadow-lg hover:shadow-orange-500/30 hover:cursor-pointer transition-all duration-300 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 py-2 px-4">
                Add
            </button>
        </div>
	</div>
</Modal>