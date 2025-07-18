<script>
	import { PopUpState } from '../states/PopUpState.svelte'
	import { onMount, tick } from 'svelte';
	let { header, children } = $props();

	let dialog = $state();
	
	function closeModal(){
		PopUpState.activeModal.pop()
	}

	onMount(async () => {
    	await tick();
    	dialog.showModal();
  	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (closeModal())}
	onclick={(e) => { if(e.target === dialog) dialog.close(); }}
	class="open:animate-zoom open:backdrop:animate-fade top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[55%] bg-transparent border-none p-0 backdrop:backdrop-blur-xs"
>
	<div class="p-6 bg-gradient-to-br from-[#0f1115] to-[#0b0c0f] rounded-xl border-2 border-gray-700/60 select-none text-white">
		{@render header?.()}
		<hr class="text-gray-700/60 mb-4"/>
		{@render children?.()}
	</div>
</dialog>
