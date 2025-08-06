<script>
	let { data } = $props()
	
	import Modal from '../Modal.svelte';
	import { PopUpState } from '../../states/PopUpState.svelte';
	import { db } from '../../db'
  	import { Config } from '../../states/PageState.svelte'

	let today = new Date().toLocaleDateString('en-CA')

	function deleteTask(){
		db.task.delete(data.id)
		PopUpState.activeModal.pop()
	}

	function toFocus(){
		window.api.startTask({
			task:$state.snapshot(data),
			monitorConfig:$state.snapshot(Config.monitorConfig)
		})
		PopUpState.activeModal.pop()
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
		{#if data.description}
        <p class="mb-2 select-text">
			{data.description}
		</p>
		{:else}
		<div class="group mb-2 flex justify-center items-center bg-transparent border-2 border-dashed border-gray-700/80 w-full h-30 rounded-2xl hover:border-gray-600 transition-all duration-300">
			<div class="flex items-center gap-3 text-gray-500 group-hover:text-gray-400 transition-all duration-300 ease-out group-hover:scale-105">
				<span>┬─┬ノ( º _ ºノ)</span>
				<span class="font-semibold">... Nothing Here</span>
			</div>
		</div>
		{/if}
		<div class="flex justify-between items-end">
			<div class="flex flex-col">
        		<div class="task-input flex items-center">
					<input type="checkbox" disabled>
        			<p class="text-orange-500">{data.done ? 'finished' : 'pending'}</p>
				</div>
				<div class="font-dot">
					{data.hour}h {data.minute}m
				</div>
    		</div>
			{#if today==data.date && !data.done}
			<button onclick={toFocus} class="flex items-end cursor-pointer hover:scale-110 transition-all">
				<p class="font-dot text-gray-600">//lock in</p>
				<img alt="focus" src="focus.svg" class="w-8 h-8"/>
			</button>
			{/if}
		</div>
    </div>

</Modal>