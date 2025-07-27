<script>
	let { data = $bindable() } = $props()
	
	import Modal from '../Modal.svelte';
</script>

<Modal>
	{#snippet header()}
		<h2 class="text-2xl font-black">
			Chat Settings
		</h2>
	{/snippet}
	<div class="flex flex-col">
		<div class="flex justify-between">
			<h2 class="text-orange-500 font-semibold">Temperature</h2>
			<h2 class="font-dot">{data.temperature}</h2>
		</div>
		<input class="accent-orange-500 hover:cursor-pointer" type="range" min=0 max=1 step=0.05 bind:value={data.temperature}/>
		<p class="text-sm text-gray-500 italic">this controls the creativity of response, the lower it is, it is more creative</p>
	</div>
</Modal>