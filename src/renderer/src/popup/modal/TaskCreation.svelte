<script>
    let { data } = $props()

	import Modal from '../Modal.svelte';
	import TimerInput from '../../components/TimerInput.svelte';
	import { db } from "../../db.js"
  	import { createAlert, PopUpState } from '../../states/PopUpState.svelte'

	let today = new Date()
	let taskInfo = $state({
        name:"",
        description:"",
        date:today.toLocaleDateString('en-CA'),
        hour:"00",
        minute:"00",
        done:false
    })

	async function addTask(){
        // Check input validity
        if(taskInfo.name==""){
            createAlert('Task Creation Failed: Must Input A Task Name!')
            return;
        }
        if(taskInfo.hour=="00" && taskInfo.minute=="00"){
            createAlert('Task Creation Failed: Must Input Time Duration On This Task!')
            return;
        }
        const id = await db.task.add($state.snapshot(taskInfo))

        PopUpState.activeModal.pop()
    }
</script>

<Modal>
	{#snippet header()}
		<h2 class="text-2xl font-black">
			Create Task
		</h2>
	{/snippet}

	<form onsubmit={(e) => { e.preventDefault(); addTask() }} class="overflow-y-auto h-90">
        <div class="flex flex-col mb-4">
            <h2 class="text-orange-500">Task Name</h2>
            <input bind:value={taskInfo.name} placeholder="What's cookin'?" class="bg-white/6 backdrop-blur-sm focus:outline-none rounded-lg p-2" type="text"/>
        </div>
		<div class="flex flex-col mb-4">
            <h2 class="text-orange-500">Task Description</h2>
            <textarea bind:value={taskInfo.description} placeholder="Optional yapping goes here..." class="bg-white/6 backdrop-blur-sm focus:outline-none rounded-lg p-2 resize-none h-25"></textarea>
        </div>
		<div class="flex flex-col mb-4">
            <h2 class="text-orange-500">Date</h2>
            <input bind:value={taskInfo.date} class="bg-white/6 backdrop-blur-sm focus:outline-none rounded-lg p-2" type="date"/>
        </div>
		<div class="flex flex-col mb-4">
            <h2 class="text-orange-500">Time Duration</h2>
            <TimerInput bind:hour={taskInfo.hour} bind:minute={taskInfo.minute}/>
        </div>
        <button class="w-full cursor-pointer hover:bg-white/15 transition-colors bg-white/10 font-semibold px-4 py-2 rounded-lg" type="submit">Add Task</button>
    </form>

	
</Modal>