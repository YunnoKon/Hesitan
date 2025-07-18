<script>
  import { extractDateInfo } from '../../utils'
  import { createModal } from '../../states/PopUpState.svelte'
  import TaskList from '../../components/TaskList.svelte';

  const today = extractDateInfo(new Date())
</script>

<div class="bg-gradient-to-br from-[#0f1115] to-[#0b0c0f] text-white fixed h-[calc(100%-50px)] w-[80%] mx-3 mb-4 border-2 border-gray-700/50 rounded-xl right-0 overflow-y-auto">
  <div class="px-[10%] py-[5%] h-full relative">
    <div class="flex items-baseline gap-5 mb-5">
        <h1 class="text-4xl font-black">Today</h1>
        <h2 class="font-dot text-2xl font-bold text-gray-400/80">{today.dateText}</h2>
    </div>

    <div class="mb-8">
        <h2 class="text-xl text-orange-500 font-semibold mb-2">Daily Task</h2>
        <div class="relative group">
            <TaskList today={new Date()}/>

            <button onclick={() => createModal("TaskCreation")} class="absolute -top-5 -right-5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full text-4xl font-bold w-14 h-14 flex items-center justify-center hover:cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-orange-500/30" aria-label="Add Task">
                <span class="transition-transform duration-300 ease-out group-hover:rotate-90">+</span>
            </button>
        </div>
    </div>

    <h2 class="text-xl text-orange-500 font-semibold mb-2">Mood</h2>
    <div class="flex text-4xl w-[30%] items-center justify-center border-gray-700/60 border-2 rounded-2xl text-white h-52 bg-white/5 backdrop-blur-sm hover:border-orange-500/80 transition-all duration-300 group">
        <div class="text-center transition-transform duration-500 ease-out group-hover:scale-105">
            <h1 class="font-dot mb-2 transition-transform duration-500 ease-out group-hover:-rotate-12">( ˘▽˘)っ</h1>
            <h2 class="text-orange-500 text-2xl font-dot font-bold tracking-wider">happy.</h2>
        </div>
    </div>
  </div>
</div>