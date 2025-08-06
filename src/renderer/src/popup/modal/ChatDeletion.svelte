<script>
	let { data = $bindable() } = $props()
	
	import Modal from '../Modal.svelte';
  	import { createAlert, PopUpState } from '../../states/PopUpState.svelte'

	const clearHistory = () => {
		createAlert("Agent: Chat History Cleared")
        data.chatHistory.length = 0
        data.msg.hasAttachment.length = 0
        data.msg.attachment.length = 0
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
		<h1>Click <span class="text-orange-500 font-bold">the button</span> below if you proceed to clear chat history</h1>
		<button onclick={clearHistory} class="primary-btn rounded-lg py-2">I Confirm</button>
		<h1 class="text-gray-500 italic text-sm">Your chat history will begone for a long time! (... like really, really long)</h1>
	</div>
</Modal>