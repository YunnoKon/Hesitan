<script>
	let { data } = $props()
	
	import Modal from '../Modal.svelte';
	import { db } from '../../db';
  	import { createAlert, PopUpState } from '../../states/PopUpState.svelte'

	const clearTask = () => {
		db.task.clear()
		createAlert("Settings: Task Data Deleted")

		PopUpState.activeModal.pop()
	}
</script>

<Modal>
	{#snippet header()}
		<h2 class="text-2xl font-black">
			Deletion Confirmation
		</h2>
	{/snippet}
	<div class="text-center flex flex-col gap-4">
		<h1>Click <span class="text-orange-500 font-bold">the button</span> below if you proceed to do it.</h1>
		<button onclick={clearTask} class="primary-btn rounded-lg py-2">I Confirm</button>
		<h1 class="text-gray-500 italic text-sm">Your task data will begone for a long time! (... like really, really long)</h1>
	</div>
</Modal>