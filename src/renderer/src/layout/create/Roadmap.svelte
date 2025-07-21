<script>
  import { db } from "../../db"
  import { createAlert, createModal } from "../../states/PopUpState.svelte"
  import { getModel } from "../../utils";
  import Pagination from "../../components/Pagination.svelte";

  let inputInfo = $state({
    preferredProvider:"google",
    userPrompt:"",
    modelName:"",
    startDate:new Date().toLocaleDateString('en-CA'),
    endDate:"",
    month:"00",
    day:"00"
  })

  let generating = $state(false);
  let roadmapPreview = $state([]);

  let modelList = Object.entries(getModel(inputInfo.preferredProvider))
  // Default to the first model it fetches
  inputInfo.modelName = modelList[0][1]

  const generateRoadmap = async () => {
    if(!inputInfo.userPrompt){ 
      createAlert("Agent: User Prompt is Required!")
      return;
    }
    if(inputInfo.month=="00" && inputInfo.day=="00"){
      createAlert("Agent: Enter a valid duration!")
      return;
    }
    
    roadmapPreview = [];
    let request = $state.snapshot(inputInfo)

    // Calculating End Date
    let endDate = new Date(inputInfo.startDate)
    endDate.setMonth(endDate.getMonth() + Number(inputInfo.month))
    endDate.setDate(endDate.getDate() + Number(inputInfo.day))
    request.endDate = endDate.toLocaleDateString('en-CA')

    generating = true;
    let response = await window.api.generateRoadmap(request)
    // Filter invalid period
    response = response.filter((e) => {
      return (e.hour>0 || e.minute>0)
    })

    roadmapPreview = response
    generating = false;
  }

  const saveRoadmap = async() => {
    await db.task.bulkAdd($state.snapshot(roadmapPreview))
    createAlert("Agent: Roadmap Added To Task List")
    roadmapPreview = []
    inputInfo.userPrompt = ""
    inputInfo.month = "00"
    inputInfo.day = "00"
  }
</script>
<div class="relative w-full pb-10">

  <div class="relative mb-3">
    <textarea bind:value={inputInfo.userPrompt} placeholder="Write your goals clearly..." class="font-medium scrollbar-thumb-dark h-60 scroll-pr-1 focus:outline-0 resize-none bg-white/6 backdrop-blur-sm p-5 pb-12 w-full rounded-xl"></textarea>
  
    <div class="backdrop-blur-xs rounded-lg gap-2 flex items-center justify-between absolute bottom-[0.45rem] right-0 rounded-b-2xl bg-transparent w-full py-3 px-6">
      <div>
        <select bind:value={inputInfo.modelName} name="model" class=" bg-transparent [&>option]:bg-[#1b1d20] focus:outline-0 text-white font-semibold text-sm block w-full pr-3">
          {#each modelList as [modelName,modelId]}
            <option value={modelId}>{modelName}</option>
          {/each}
        </select>
      </div>
      <div class="flex gap-2">
        <button onclick={() => { createModal("DateSelect",inputInfo) }} class="hover:shadow-lg hover:shadow-orange-500/30 hover:cursor-pointer hover:scale-110 transition-all duration-300 block rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-semibold py-2 px-4">
          Duration
        </button>
        <!--svelte-ignore a11y_consider_explicit_label-->
        <button onclick={generateRoadmap} class="hover:shadow-lg hover:shadow-orange-500/30 hover:cursor-pointer hover:scale-120 transition-all duration-300 block rounded-full bg-gradient-to-br from-orange-500 to-orange-600 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <div class="w-full flex flex-col gap-2">
    {#if generating}
    <div class="p-4 rounded-lg items-center justify-center flex-col flex h-70 border-gray-700/60 animate-pulse border-2">
      <h1 class="text-gray-200 font-dot">o(╥﹏╥)o</h1>
      <h1 class="font-semibold text-3xl text-orange-500 font-dot">Generating...</h1>
    </div>
    {/if}

    <Pagination bind:data={roadmapPreview} header="Roadmap Preview">
      {#snippet content(d)}
        <div class="p-4 rounded-xl bg-white/5">
          <p class="text-orange-500 text-xs">{d.date}</p>
          <h2>{d.name}</h2>
          <p class="text-sm text-gray-400">{d.description}</p>
        </div>
      {/snippet}
    </Pagination>

    {#if roadmapPreview.length}
    <button onclick={saveRoadmap} class="hover:shadow-lg hover:shadow-white/6 hover:scale-105 transition-all w-50 m-auto font-bold hover:cursor-pointer rounded-lg py-2 bg-white/10">Save To Task List... ?</button>
    {/if}
  </div>
</div>