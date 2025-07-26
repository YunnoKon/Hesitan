<script>
    let { message, time } = $props()
    import { fade } from 'svelte/transition'
    import { PopUpState } from '../states/PopUpState.svelte'
    import { onMount, tick } from 'svelte'

    let box = $state();

    onMount(async () => {
    	await tick();
    	box.showPopover();
        setTimeout(() => { PopUpState.activeAlert.shift() }, time)
  	});
</script>

<div 
    class="bg-transparent top-[87%] left-1/2 transform -translate-x-1/2"
    in:fade={{ duration: 200 }}
    out:fade={{ duration: 200 }}
    bind:this={box}
    popover
>
    <div class="flex font-semibold bg-white/7 backdrop-blur-2xl py-2 px-6 gap-4 rounded-lg text-white">
        <img src='alert.svg' alt="icon" class="w-5"/>
        <h1>{message}</h1>
    </div>
</div>