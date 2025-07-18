<script>
	let { data } = $props()
	
	import Modal from '../Modal.svelte';
	import TaskList from '../../components/TaskList.svelte'
  	import { extractDateInfo } from '../../utils'
	
	let selectedDate = new Date(data.ext.year, data.ext.month, data.day)
	const ext = extractDateInfo(selectedDate)

	// Decorative Stuff
	let monthHeader = {
		0:"New Beginnings & Winter's Quiet",
		1:"Love, Purification & Hope",
		2:"Awakening & Change",
		3:"Blossoms & Reflection",
		4:"Abundance & Flourishing",
		5:"Celebration & Transition",
		6:"Heart of Summer",
		7:"Harvest & Abundance",
		8:"Maturity & Preparation",
		9:"Transformation & Elegy",
		10:"Reflection & Foreboding",
		11:"Closure & Revival"
	}
</script>

<Modal>
	{#snippet header()}
		<div class="flex justify-between items-end mb-2">
			<h1 class="text-3xl font-dot font-bold">{ext.dateText}</h1>
			<p class="font-dot text-balance text-gray-600">{ext.monthText} // {monthHeader[ext.month]}</p>
		</div>
	{/snippet}

	<div>
		<h2 class=" text-orange-500 font-semibold mb-2">Task List</h2>
        <TaskList today={selectedDate} modal=True/>
    </div>

</Modal>