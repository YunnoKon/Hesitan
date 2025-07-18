<script>
  import { createAlert, createModal } from "../../states/PopUpState.svelte"

  let today = new Date()
  let inputInfo = $state({
    userPrompt:"",
    modelName:"gemini-2.5-flash-lite-preview-06-17",
    startDate:today.toLocaleDateString('en-CA'),
    month:"00",
    day:"00"
  })

  const generateRoadmap = () => {
    if(!inputInfo.userPrompt){ 
      createAlert("Agent: User Prompt is Required!")
      return;
    }
    window.electron.ipcRenderer.send('agent.roadmap',$state.snapshot(inputInfo))
  }
</script>
<div class="relative w-full">

  <textarea bind:value={inputInfo.userPrompt} placeholder="Write your goals clearly..." class="font-medium scrollbar-thumb-dark h-60 scroll-pr-1 focus:outline-0 resize-none bg-white/6 backdrop-blur-sm p-5 pb-12 w-full rounded-xl"></textarea>
  
  <div class="backdrop-blur-xs rounded-lg gap-2 flex items-center justify-between absolute bottom-[0.45rem] right-0 rounded-b-2xl bg-transparent w-full py-3 px-6">
    <div>
      <select name="model" class=" bg-transparent [&>option]:bg-[#1b1d20] focus:outline-0 text-white font-semibold text-sm block w-full pr-3">
        <option value="gemini-2.5-flash">gemini-2.5-flash</option>
        <option value="saab">gemini-2.0-flash</option>
        <option value="mercedes">gemini-2.0-pro</option>
        <option value="audi">gemini-2.0-flash</option>
      </select>
    </div>
    <div class="flex gap-2">
      <button onclick={() => { createModal("DateSelect",inputInfo) }} class="hover:shadow-lg hover:shadow-orange-500/30 hover:cursor-pointer hover:scale-110 transition-all duration-300 block rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-semibold py-2 px-4">
        Duration
      </button>
      <!--svelte-ignore a11y_consider_explicit_label-->
      <button onclick={() => generateRoadmap()} class="hover:shadow-lg hover:shadow-orange-500/30 hover:cursor-pointer hover:scale-120 transition-all duration-300 block rounded-full bg-gradient-to-br from-orange-500 to-orange-600 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>
  </div>
</div>