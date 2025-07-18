<script>
  import ToolButton from "../../components/ToolButton.svelte";
  import CreateView from "../create/CreateView.svelte"
</script>

<div class="bg-gradient-to-br from-[#0f1115] to-[#0b0c0f] text-white fixed h-[calc(100%-50px)] w-[80%] mx-3 mb-4 border-2 border-gray-700/50 rounded-xl right-0 overflow-y-auto">
  <div class="px-[10%] py-[5%] relative h-full">
    <div class="flex items-baseline gap-5 mb-4">
        <h1 class="text-4xl font-black">Create</h1>
    </div>
    <div class="flex w-full justify-around rounded-lg p-2 mb-5">
      <ToolButton title="Roadmap"/>
      <ToolButton title="Tutor"/>
    </div>
    <CreateView/>
  </div>
</div>