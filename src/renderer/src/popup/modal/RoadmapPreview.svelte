<script>
    let { data } = $props()

	import Modal from '../Modal.svelte';
    import Pagination from '../../components/Pagination.svelte'
    import { db } from '../../db'
    import { createAlert, PopUpState } from '../../states/PopUpState.svelte'

    const saveRoadmap = async() => {
        await db.task.bulkAdd(Object.assign($state.snapshot(data), { done: false }))
        createAlert("Agent: Roadmap Added To Task List")
        PopUpState.activeModal.pop()
    }
</script>

<Modal>
	{#snippet header()}
		<h2 class="text-2xl font-black">
			Learning Roadmap
		</h2>
	{/snippet}

    <div class="h-120 overflow-y-auto">
        <Pagination bind:data={data} header="Roadmap Preview">
            {#snippet content(d)}
                <div class="p-4 rounded-xl bg-white/5 mb-3">
                <p class="text-orange-500 text-xs">{d.date}</p>
                <h2>{d.name}</h2>
                <p class="text-sm text-gray-400">{d.description}</p>
                </div>
            {/snippet}
        </Pagination>
    </div>
    <button onclick={saveRoadmap} class="hover:shadow-lg hover:shadow-white/6 hover:scale-102 transition-all mt-3 font-bold hover:cursor-pointer rounded-lg py-2 bg-white/10 w-full">Save To Task List... ?</button>
</Modal>