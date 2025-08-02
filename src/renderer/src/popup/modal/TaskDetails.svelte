<script>
	let { data } = $props()
	
	import Modal from '../Modal.svelte';
	import { PopUpState } from '../../states/PopUpState.svelte';
	import { db } from '../../db'

	let today = new Date().toLocaleDateString('en-CA')

	function deleteTask(){
		db.task.delete(data.id)
		PopUpState.activeModal.pop()
	}

	function toFocus(){
		window.api.sendTask($state.snapshot(data))
		window.api.switchLayer()
	}
</script>

<Modal>
	{#snippet header()}
		<div class="flex justify-between items-end mb-2">
			<h2 class="text-2xl font-black w-fit">
				{data.name}
			</h2>
			<button onclick={deleteTask} class="mb-1 transition ease-in hover:scale-125 hover:cursor-pointer">
				<img src='delete.svg' alt="icon" class="w-5"/>
			</button>
		</div>
	{/snippet}

	<div>
        <p class="mb-2">
			{data.description}
		</p>
		<div class="flex justify-between items-center">
			<div class="flex flex-col">
        		<div class="task-input flex items-center">
					<input type="checkbox" disabled=True>
        			<p class="text-orange-500">pending</p>
				</div>
				<div class="font-dot">
					{data.hour}h {data.minute}m
				</div>
    		</div>
			{#if today==data.date}
			<button onclick={toFocus} class="flex gap-2 items-center transition-all font-bold hover:scale-110 hover:shadow-lg hover:shadow-white/6 rounded-lg cursor-pointer bg-white/10 px-4 py-2">
				<img alt="focus" src="focus.svg" class="w-5 h-5"/> Lock In
			</button>
			{/if}
		</div>
    </div>

</Modal>