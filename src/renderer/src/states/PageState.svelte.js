// Page State Manager With Runes
export let PageState = $state({
    current: "today",
    createTool: "roadmap"
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
    }
})