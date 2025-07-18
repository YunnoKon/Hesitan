<script>
  import { extractDateInfo } from '../../utils'
  import CalendarGrid from '../../components/CalendarGrid.svelte'

  let dateSelection = $state(extractDateInfo(new Date()))
  let ext = $derived(extractDateInfo(new Date(dateSelection.year,dateSelection.month)))
</script>

<div class="bg-gradient-to-br from-[#0f1115] to-[#0b0c0f] text-white fixed h-[calc(100%-50px)] w-[80%] mx-3 mb-4 border-2 border-gray-700/50 rounded-xl right-0 overflow-y-auto">
  <div class="px-[10%] py-[5%] h-full relative">
    <div class="mb-3 flex justify-between">
      <div>
        <h1 class="text-4xl font-black">{ext.monthText}</h1>
        <p class="text-gray-600 font-bold">{ext.year}</p>
      </div>
      <div class="flex flex-col text-2xl">
        <button onclick={() => dateSelection.month -= 1} class="hover:cursor-pointer hover:text-orange-500">▲</button>
        <button onclick={() => dateSelection.month += 1} class="hover:cursor-pointer hover:text-orange-500">▼</button>
      </div>
    </div>
    <hr class="text-gray-600 mb-8">
    <CalendarGrid bind:ext={ext}/>
  </div>
</div>