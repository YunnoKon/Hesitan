<script>
  import { createAlert, createModal } from "../../states/PopUpState.svelte"
  import { getModel } from "../../utils";

  let inputInfo = $state({
    preferredProvider:"google",
    userPrompt:"",
    modelName:"",
    startDate:new Date().toLocaleDateString('en-CA'),
    endDate:"",
    month:"00",
    day:"00"
  })

  let modelObj = getModel(inputInfo.preferredProvider)
  let modelList = Object.keys(modelObj)
  // Default to the first model it fetches
  inputInfo.modelName = modelList[0]

  const generateRoadmap = () => {
    if(!inputInfo.userPrompt){ 
      createAlert("Agent: User Prompt is Required!")
      return;
    }
    if(inputInfo.month=="00" && inputInfo.day=="00"){
      createAlert("Agent: Enter a valid duration!")
      return;
    }
    
    let request = $state.snapshot(inputInfo)

    // Calculating End Date
    let endDate = new Date(inputInfo.startDate)
    endDate.setMonth(endDate.getMonth() + Number(inputInfo.month))
    endDate.setDate(endDate.getDate() + Number(inputInfo.day))
    request.endDate = endDate.toLocaleDateString('en-CA')
    
    // Mapping model name to model id
    request.modelName = modelObj[inputInfo.modelName]

    window.api.generateRoadmap(request)
  }
</script>
<div class="relative w-full">

  <div class="relative mb-3">
    <textarea bind:value={inputInfo.userPrompt} placeholder="Write your goals clearly..." class="font-medium scrollbar-thumb-dark h-60 scroll-pr-1 focus:outline-0 resize-none bg-white/6 backdrop-blur-sm p-5 pb-12 w-full rounded-xl"></textarea>
  
    <div class="backdrop-blur-xs rounded-lg gap-2 flex items-center justify-between absolute bottom-[0.45rem] right-0 rounded-b-2xl bg-transparent w-full py-3 px-6">
      <div>
        <select bind:value={inputInfo.modelName} name="model" class=" bg-transparent [&>option]:bg-[#1b1d20] focus:outline-0 text-white font-semibold text-sm block w-full pr-3">
          {#each modelList as modelName}
            <option value={modelName}>{modelName}</option>
          {/each}
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

  <div class="w-full">
    <div>
      
    </div>
  </div>
</div>