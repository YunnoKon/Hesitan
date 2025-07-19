<script>
    /*
    Property
    Today: Specify the day to query the todo list
    Modal: Adjusted CSS For Modal Display
    */
    let { today, modal = false } = $props()

    import { liveQuery } from "dexie";
    import { db } from "../db"
    import Task from "./Task.svelte"

    let _tasks = liveQuery(
        async() => {
            const tasks = await db.task.where({ date: today.toLocaleDateString('en-CA') }).toArray()
            return tasks
        }
    )
    let tasks = $derived($_tasks)
</script>

{#if tasks?.length}
<div class="group relative flex flex-col bg-white/5 backdrop-blur-sm border-2 border-gray-700/60 hover:border-orange-500/80 w-full h-50 rounded-2xl transition-colors duration-300">
    
    <div class="w-full h-full overflow-y-auto py-4 px-6">
        <ul class="text-lg">
            {#each tasks as task (task.id)}
                <Task taskInfo={task}/>
            {/each}
        </ul>
    </div>

    <div class="-z-10 font-dot leading-snug absolute -bottom-6 text-gray-400/50 group-hover:text-gray-400/70 transition-colors duration-300 pointer-events-none -right-5 text-xs">
        <pre>
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢇⠀⠃⣈⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣤⣤⣤⣄⣀⡀⠙⠞⠁⠀⠀⠀⣀⣀⣀⣀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢰⡏⢻⣫⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⠟⣿⠀⠀⠀⠀⠀
⠀⠀⠀⠀⡐⡄⣸⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⣿⠀⠀⠀⠀⠀
⠀⠀⣀⠠⢝⡜⣿⣿⡟⢉⣭⡝⢿⣿⣿⣿⡟⣭⣭⠉⢻⣿⡿⡠⠒⠀⠀⠀
⡴⣟⣿⣻⣆⢰⣿⣿⠀⢸⣿⣿⢸⣿⣿⣿⠙⣿⣿⠇⠈⣿⣿⠱⠭⠄⠀⠀
⢷⣿⡀⣸⣿⡞⣿⣿⣄⠀⠉⠁⣼⣿⢿⣿⣧⠈⠁⠀⣰⣿⣿⣠⣴⣶⣦⣄
⠈⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠙⠒⠓⠒⠛⠛⠛⠛⠛⠛⠓⠻⡏⣿⣿⠿ 
        </pre>
    </div>
</div>
{:else}
<div class="group flex justify-center items-center bg-transparent border-2 border-dashed border-gray-700/80 w-full h-50 rounded-2xl hover:border-gray-600 transition-all duration-300">
    <div class="flex items-center gap-3 text-gray-500 group-hover:text-gray-400 transition-all duration-300 ease-out group-hover:scale-105">
        <span>┬─┬ノ( º _ ºノ)</span>
        <span class="font-semibold">... Nothing Here</span>
    </div>
</div>
{/if}