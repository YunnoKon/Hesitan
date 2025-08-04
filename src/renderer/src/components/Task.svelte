<script>
    import { createModal } from "../states/PopUpState.svelte"

    let { taskInfo } = $props()
</script>

<li>
    <div class="w-full task-input flex items-baseline gap-1">
        <input disabled checked={taskInfo.done} type="checkbox" name="{taskInfo.id}">
        <button onclick={() => createModal("TaskDetails",taskInfo)} class="{taskInfo.done ? 'line-through text-gray-500 hover:text-gray-600' : 'hover:text-gray-500'} hover:cursor-pointer text-left w-fit">
            {taskInfo.name}
        </button>
    </div>
</li>