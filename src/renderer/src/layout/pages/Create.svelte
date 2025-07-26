<script>
  import { marked } from 'marked'
  import { Config } from "../../states/PageState.svelte"
  import { getModel } from "../../utils";
  import { createModal } from '../../states/PopUpState.svelte'

  let inputInfo = $state({
    preferredProvider:Config.preferredProvider,
    userPrompt:"",
    modelName:"",
    chatHistory:[]
  })
  let textElm;
  let attachment = $state([])

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

  const sendMessage = () => {
    inputInfo.chatHistory.push({ role:"user", content:$state.snapshot(inputInfo.userPrompt)})
    attachment.push([])
    window.api.chat($state.snapshot(inputInfo))
    inputInfo.chatHistory.push({ role:"assistant", content:"" })
    attachment.push([])
    inputInfo.userPrompt = ""
  }

  window.api.onChatStream((args) => {
    inputInfo.chatHistory[inputInfo.chatHistory.length-1].content += args;
  })

  window.api.onRoadmapResponse((args) => {
    args = args.filter((e) => {
      return (e.hour>0 || e.minute>0)
    })
    attachment[attachment.length-1] = args
  })
</script>

<div class="bg-gradient-to-br from-[#0f1115] to-[#0b0c0f] text-white fixed h-[calc(100%-50px)] w-[80%] mx-3 mb-4 border-2 border-gray-700/50 rounded-xl right-0 overflow-y-auto">
  <div class="px-[10%] py-[5%] relative h-full">
    <div class="flex gap-4 flex-col pb-40">
      {#each inputInfo.chatHistory as chat, i}
        {#if chat.role=="user"}
        <div class="bg-white/10 rounded-xl py-3 px-6 text-left w-[70%]">
          <p>{chat.content}</p>
        </div>
        {:else}
        <div class="flex gap-5 items-baseline">
          <div class="font-dot text-sm font-black text-white">( . .)φ_</div>
          <div class="w-[calc(100%-85px)] markdown flex flex-col gap-1">
            {@html marked(chat.content)}
            {#if attachment[i].length}
            <button onclick={() => { createModal("RoadmapPreview",attachment[i]) }} class="bg-white/6 w-full p-4 rounded-xl mt-2 text-left">
              <h3>Learning Roadmap</h3>
              <p class="text-xs text-white/70">Click to inspect and add into task list</p>
            </button>
            {/if}
          </div>
        </div>
        {/if}
      {/each}
    </div>
    <div class="backdrop-blur-xl flex flex-col fixed bottom-10 w-[63.3%]">
      <textarea 
        bind:this={textElm} 
        bind:value={inputInfo.userPrompt}
        onkeydown={(e) => {
          if(e.key=="Enter" && !e.shiftKey){
            e.preventDefault()
            sendMessage();
          }
        }}
        placeholder="Write your goals clearly..." 
        class="max-h-30 min-h-14 w-full font-medium scrollbar-thumb-dark scroll-pr-1 focus:outline-0 resize-none bg-white/6 p-4 rounded-xl rounded-b-none"
      ></textarea>
      <div class="bg-white/6 flex items-center px-4 py-3 justify-between rounded-b-xl">
        <div>
          <select bind:value={inputInfo.modelName} name="model" class=" bg-transparent [&>option]:bg-[#1b1d20] focus:outline-0 text-white font-semibold text-sm block w-full pr-3">
            {#each modelList as [modelName,modelId]}
              <option value={modelId}>{modelName}</option>
            {/each}
          </select>
        </div>
        <button onclick={sendMessage} class="hover:shadow-lg hover:shadow-orange-500/30 hover:cursor-pointer hover:scale-120 transition-all duration-300 block rounded-full bg-gradient-to-br from-orange-500 to-orange-600 p-2">
          <img alt="send" class="w-5 h-5" src="send.svg"/>
        </button>
      </div>
    </div>
  </div>
</div>