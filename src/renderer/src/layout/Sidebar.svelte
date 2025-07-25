<script>
  import SidebarButton from "../components/SidebarButton.svelte"

</script>

<div class="flex flex-col justify-between fixed h-[calc(100%-50px)] w-[17.5%] mx-2 mb-3 rounded-xl bg-gradient-to-br from-[#0f1115] to-[#0b0c0f] border-gray-700/50 border-2">
  <div class="mt-4">
    <SidebarButton title="Today"/>
    <SidebarButton title="Calendar"/>
    <SidebarButton title="Create"/>
    <SidebarButton title="Chat"/>
  </div>
  <div>
    <SidebarButton title="Settings"/>
  </div>
</div>