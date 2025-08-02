<script>
    let title = $state("")
    let hour = $state(0)
    let minute = $state(0)

    let timer;
    
    window.api.receiveTask((data) => {
        hour = Number(data.hour)
        minute = Number(data.minute)
        title = data.name

        timer = setInterval(() => {
            minute--;
            if(minute<0 && hour>0){
                hour--;
                minute = 59;
            }
        },60000)
    })

    $effect(() => {
        if(hour==0 && minute==0){ 
            clearInterval(timer)
            window.api.switchLayer()
        }
    })
</script>

<div class="[app-region:drag] border-gray-700/60 border-2 bg-black/80 fixed h-full w-full rounded-xl justify-center flex-col flex p-4">
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
    <button onclick={window.api.minimize} class="hover:scale-120 hover:rotate-120 transition-all [app-region:no-drag] cursor-pointer absolute bottom-2 right-2">
        <img alt="minimize" src="indeterminate.svg" class="w-5 h-5"/>
    </button>
</div>