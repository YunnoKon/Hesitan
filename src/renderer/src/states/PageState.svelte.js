// Page State Manager With Runes
export let PageState = $state({
    current: "today",
})

// Global Config State
export let Config = $state({
    preferredProvider:"google",
    providerConfig:{
        google:{
            key:""
        },
        openai:{
            key:""
        },
        anthropic:{
            key:""
        }
    },
    monitorConfig:{
        monitoring:true,
        monitorList:['steamapp','robloxplayer'],
        monitorInterval:10000
    }
})