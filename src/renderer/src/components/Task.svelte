<script>
    import { createModal } from "../states/PopUpState.svelte"

    let { taskInfo } = $props()
</script>

<li>
    <div class="w-full flex items-baseline gap-1">
        <input type="checkbox" name="{taskInfo.id}">
        <button onclick={() => createModal("TaskDetails",taskInfo)} class="hover:text-gray-500 hover:cursor-pointer text-left w-fit">{taskInfo.name}</button>
    </div>
</li>