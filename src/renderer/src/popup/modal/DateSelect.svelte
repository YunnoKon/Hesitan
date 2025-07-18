<script>
	let { data = $bindable() } = $props()
	
	import Modal from '../Modal.svelte';
    import DurationInput from '../../components/DurationInput.svelte';
</script>

<Modal>
	{#snippet header()}
		<h2 class="text-2xl font-black">
			Roadmap Duration
		</h2>
	{/snippet}

    <div class="flex flex-col gap-3">
        <div>
            <h2 class="text-orange-500">Start Date</h2>
            <input bind:value={data.startDate} class="bg-white/6 w-full backdrop-blur-sm focus:outline-none rounded-lg p-2" type="date"/>
        </div>
        <div>
            <h2 class="text-orange-500">Your Roadmap Ends in...</h2>
            <DurationInput bind:day={data.day} bind:month={data.month}/>
        </div>
    </div>

</Modal>