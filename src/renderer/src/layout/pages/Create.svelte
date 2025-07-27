<script>
  import { marked } from 'marked'
  import { Config } from "../../states/PageState.svelte"
  import { getModel } from "../../utils";
  import { createAlert, createModal } from '../../states/PopUpState.svelte'

  let inputInfo = $state({
    preferredProvider:Config.preferredProvider,
    userPrompt:"",
    modelName:"",
    chatHistory:[],
    agentSettings:{
      temperature:1.0
    }
  })
  let messageInfo = $state({
    attachment:[],
    hasAttachment:[]
  })
  let textElm;
  let lockInput = $state(false)

  let prewritten = [
    "Create a roadmap for me on fishing.",
    "Why do flowers bloom?",
    "What caused butter to be slippery?"
  ]

  let modelList = $derived(Object.entries(getModel(inputInfo.preferredProvider)))

  // Update preferred provider and default to the first model it fetches
  $effect(() => { inputInfo.preferredProvider = Config.preferredProvider })
  $effect(() => { inputInfo.modelName = modelList[0][1] })

  $effect(() => {
    inputInfo.userPrompt;
    if(textElm){
      textElm.style.height = '1px';
      textElm.style.height = `${textElm.scrollHeight}px`;
    }
  })

  const createMessage = (role,content) => {
    inputInfo.chatHistory.push({ role, content })
    messageInfo.attachment.push([])
    messageInfo.hasAttachment.push(false)
  }

  const sendMessage = () => {
    if(lockInput) return;
    createMessage("user",$state.snapshot(inputInfo.userPrompt))
    window.api.chat($state.snapshot(inputInfo))
    createMessage("assistant","")
    inputInfo.userPrompt = ""
    
    lockInput = true
  }

  const clearChatHistory = () => {
    createModal("ChatDeletion",{
      chatHistory:inputInfo.chatHistory, 
      msg:messageInfo 
    })
  }

  const openChatSettings = () => {
    createModal("ChatSettings",inputInfo.agentSettings)
  }

  window.api.onChatStream((args) => {
    inputInfo.chatHistory[inputInfo.chatHistory.length-1].content += args;
  })

  window.api.onChatStreamEnd(() => {
    lockInput = false;
  })

  window.api.onChatError((args) => {
    createAlert(args)
    inputInfo.chatHistory.length = 0
    messageInfo.hasAttachment.length = 0
    messageInfo.attachment.length = 0
  })

  window.api.onRoadmapStart(() => {
    messageInfo.hasAttachment[messageInfo.hasAttachment.length-1] = true
  })

  window.api.onRoadmapEnd((args) => {
    args = args.filter((e) => {
      return (e.hour>0 || e.minute>0)
    })
    messageInfo.attachment[messageInfo.attachment.length-1] = args
  })
</script>

<div class="bg-gradient-to-br from-[#0f1115] to-[#0b0c0f] text-white fixed h-[calc(100%-50px)] w-[80%] mx-3 mb-4 border-2 border-gray-700/50 rounded-xl right-0 overflow-y-auto">
  <div class="px-[10%] py-[5%] relative h-full">
    {#if inputInfo.chatHistory.length}
    <div class="flex gap-4 flex-col pb-40">
      {#each inputInfo.chatHistory as chat, i}
        {#if chat.role=="user"}
        <div class="bg-white/10 font-medium rounded-2xl rounded-tl-none py-3 px-6 text-left w-[75%]">
          <p>{chat.content}</p>
        </div>
        {:else}
        <div class="flex gap-5 items-start">
          <div class="font-dot text-sm font-black text-white">( . .)φ_</div>
          <div class="w-[calc(100%-85px)] markdown flex flex-col gap-1">
            {@html marked(chat.content)}
            {#if messageInfo.attachment[i].length}
            <button onclick={() => { createModal("RoadmapPreview",messageInfo.attachment[i]) }} class="hover:cursor-pointer hover:border-orange-500/80 border-gray-700/60 border-2 bg-white/6 w-full p-4 rounded-xl mt-2 text-left">
              <h3 class="font-dot">Learning Roadmap</h3>
              <p class="text-xs text-white/70">Click to inspect and add into task list</p>
            </button>
            {:else if messageInfo.hasAttachment[i]}
            <button class="animate-pulse border-gray-700/60 border-2 bg-white/6 w-full p-4 rounded-xl mt-2 text-left">
              <h3 class="font-dot">( ◡̀_◡́)ᕤ Generating...</h3>
              <p class="text-xs text-white/70">Great stuff takes time...</p>
            </button>
            {/if}
          </div>
        </div>
        {/if}
      {/each}
    </div>
    {:else}
    <div class="flex flex-col gap-5 items-center justify-center h-full">
      <h1 class="text-3xl font-black">What's On <span class="text-orange-500">Your Mind?</span></h1>
      <div class="flex gap-3">
        {#each prewritten as text}
        <button onclick={() => {inputInfo.userPrompt = text; textElm.focus(); }} class="transition-all duration-200 ease-in-out text-white/60 hover:scale-105 hover:cursor-pointer hover:border-orange-500/80 border-gray-700/60 border-2 w-45 bg-white/6 text-left py-3 px-4 rounded-xl">
          {text}
        </button>
        {/each}
      </div>
    </div>
    {/if}
    <div class="rounded-xl backdrop-blur-xl flex flex-col fixed bottom-10 w-[63.3%]">
      <textarea
        bind:this={textElm} 
        bind:value={inputInfo.userPrompt}
        onkeydown={(e) => {
          if(e.key=="Enter" && !e.shiftKey){
            e.preventDefault()
            sendMessage();
          }
        }}
        placeholder="Ask any question or generate roadmap for you..." 
        class="max-h-30 min-h-14 w-full font-medium scrollbar-thumb-dark scroll-pr-1 focus:outline-0 resize-none bg-white/6 p-4 rounded-xl rounded-b-none"
      ></textarea>
      <div class="bg-white/6 flex items-center px-4 py-3 justify-between rounded-b-xl">
        <div class="flex gap-2">
            <select bind:value={inputInfo.modelName} name="model" class=" bg-transparent [&>option]:bg-[#1b1d20] focus:outline-0 text-white font-semibold text-sm block w-full pr-3">
              {#each modelList as [modelName,modelId]}
                <option value={modelId}>{modelName}</option>
              {/each}
            </select>
            <button onclick={openChatSettings} class="transition-all hover:rotate-120 hover:scale-115 cursor-pointer">
              <img alt="settings" class="w-7 h-7" src="settings.svg"/>
            </button>
            <button onclick={clearChatHistory} class="transition-all hover:rotate-120 hover:scale-115 cursor-pointer">
              <img alt="reset" class="w-7 h-7" src="reset.svg"/>
            </button>
        </div>
        <button disabled={lockInput} onclick={sendMessage} class="disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-orange-500/30 hover:cursor-pointer hover:scale-120 transition-all duration-300 block rounded-full bg-gradient-to-br from-orange-500 to-orange-600 p-2">
          <img alt="send" class="w-5 h-5" src="send.svg"/>
        </button>
      </div>
    </div>
  </div>
</div>