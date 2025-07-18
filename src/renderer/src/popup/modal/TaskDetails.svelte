<script>
	let { data } = $props()
	
	import Modal from '../Modal.svelte';
	import { PopUpState } from '../../states/PopUpState.svelte';
	import { db } from '../../db'

	function deleteTask(){
		db.task.delete(data.id)
		PopUpState.activeModal.pop()
	}
</script>

<Modal>
	{#snippet header()}
		<div class="flex justify-between items-end mb-2">
			<h2 class="text-2xl font-black w-fit">
				{data.name}
			</h2>
			<button onclick={deleteTask} class="mb-1 transition ease-in hover:scale-125 hover:cursor-pointer">
				<img src='src/assets/delete.svg' alt="icon" class="w-5"/>
			</button>
		</div>
	{/snippet}

	<div>
        <p class="mb-2">
			{data.description}
		</p>
    	<div class="flex flex-col">
        	<div class="flex items-center">
				<input type="checkbox" disabled=True>
        		<p class="text-orange-500">pending</p>
			</div>
			<div class="font-dot">
				{data.hour}h {data.minute}m
			</div>
    	</div>
    </div>

</Modal>