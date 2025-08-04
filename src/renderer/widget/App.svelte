<script>
    let openDesc = $state(false)
    let title = $state('')
    let description = $state('')
    let hour = $state(0)
    let minute = $state(0)
    let taskId = $state('')

    let timer;
    
    window.api.onTaskStart((data) => {
        hour = Number(data.task.hour)
        minute = Number(data.task.minute)
        title = data.task.name
        description = data.task.description
        taskId = data.task.id

        timer = setInterval(() => {
            minute--;
            if(minute<0 && hour>0){
                hour--;
                minute = 59;
            }
        },60000)

        window.api.startMonitor(data.monitorConfig)
    })

    const endProcess = (endTask) => {
        clearInterval(timer)
        if(endTask) window.api.endTask(taskId)
        window.api.endMonitor()
        window.api.switchLayer()
    }
    
    $effect(() => {
        if(hour==0 && minute==0) endProcess(true)
    })
</script>

<div class="[app-region:drag] border-gray-700/60 border-2 bg-black/80 fixed h-auto w-full rounded-xl justify-center flex-col flex px-4 py-7">
    {#if openDesc}
    <p class="text-white text-xs break-all">
        {description}
    </p>
    {:else}
    <div class="flex items-center gap-1">
        <img alt="focus" src="dot.svg" class="w-3.5 h-3.5 animate-pulse"/>
        <h1 class="text-orange-500 font-bold">Focusing On...</h1>
    </div>
    <h1 class="text-white text-sm leading-4 font-semibold">{title}</h1>
    <div class="flex gap-1 items-center font-dot">
        <div class="flex gap-1">
            <h2 class="text-4xl text-white">{hour.toString().padStart(2,"0")}</h2>
            <p class="text-orange-500 font-bold">hr</p>
        </div>
        <h1 class="text-3xl text-orange-500">/</h1>
        <div class="flex gap-1">
            <h2 class="text-4xl text-white">{minute.toString().padStart(2,"0")}</h2>
            <p class="text-orange-500 font-bold">min</p>
        </div>
    </div>
    {/if}
    <div class="flex absolute bottom-2 right-2 gap-1">
        <button onclick={() => { endProcess(false) }} class="hover:scale-120 transition-all [app-region:no-drag] cursor-pointer">
            <img alt="leave" src="leave.svg" class="w-5 h-5"/>
        </button>
        {#if description}
        <button onclick={() => openDesc = !openDesc} class="hover:scale-120 hover:rotate-20 transition-all [app-region:no-drag] cursor-pointer">
            <img alt="desc" src="description.svg" class="w-5 h-5"/>
        </button>
        {/if}
        <button onclick={window.api.minimize} class="hover:scale-120 hover:rotate-20 transition-all [app-region:no-drag] cursor-pointer">
            <img alt="minimize" src="indeterminate.svg" class="w-5 h-5"/>
        </button>
    </div>
</div>