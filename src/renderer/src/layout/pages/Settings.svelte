<script>
  import { createAlert, createModal } from "../../states/PopUpState.svelte"
  import { Config } from "../../states/PageState.svelte"
  import { fly } from "svelte/transition"
  import { sineIn, sineOut } from 'svelte/easing';

  let editableConfig = $state({ ...$state.snapshot(Config) })
  window.api.getConfig().then((args) => {
    if(!args) return;
    Object.assign(Config, { ...args });
    Object.assign(editableConfig, { ...args });
  })

  let warningSave = $derived(
    JSON.stringify(editableConfig)!=JSON.stringify(Config)
  )
  
  let providerList = Object.keys(Config.providerConfig)
  let toggleVisibility = $state({
    key: false
  })
  
  const saveConfig = () => {
    window.api.saveConfig($state.snapshot(editableConfig))
    Object.assign(Config, { ...$state.snapshot(editableConfig) });
    createAlert("Settings: Changes Saved")
  }
</script>

<div class="bg-gradient-to-br from-[#0f1115] to-[#0b0c0f] text-white fixed h-[calc(100%-50px)] w-[80%] mx-3 mb-4 border-2 border-gray-700/50 rounded-xl right-0 overflow-y-auto">
  <div class="px-[10%] py-[5%] h-full relative">
    <h1 class="text-4xl font-black mb-5">Settings</h1>
    <div class="flex justify-between items-center mb-3 bg-white/6 p-4 rounded-lg">
      <div class="flex gap-2">
        {#each providerList as prov}
          <button onclick={() => { editableConfig.preferredProvider = prov }} class="{editableConfig.preferredProvider==prov ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-white/6 hover:bg-white/12'} p-2 rounded-lg hover:cursor-pointer hover:scale-110 transition-all">
            <img src="provider/{prov}.svg" alt={prov} class="w-6"/>
          </button>
        {/each}
      </div>
      <div class="text-right">
        <h1 class="text-orange-500 font-dot text-xl font-black">~ Providers</h1>
        <p class="text-xs italic text-white/40">Click to switch between providers</p>
      </div>
    </div>
    <div class="p-4 bg-white/6 rounded-lg mb-3">
      <h1 class="text-sm font-bold mb-3">Provider Settings</h1>
      <p class="text-orange-500 font-semibold text-sm">API Key</p>
      <div class="w-full flex gap-2">
          <input bind:value={editableConfig["providerConfig"][editableConfig.preferredProvider]["key"]} placeholder="Keep your key secured..." class="bg-white/6 backdrop-blur-sm focus:outline-none w-full rounded-lg py-2 px-3" type={ toggleVisibility.key ? 'text' : 'password'}/>
          <button onclick={() => { toggleVisibility.key = !toggleVisibility.key }} type="button" class="hover:scale-110 transition-all duration-300 cursor-pointer block bg-white/6 p-2 rounded-lg">
            <img src={ toggleVisibility.key ? 'eye.svg' : 'eyeoff.svg'} alt="icon" class="w-6"/>
          </button>
      </div>
    </div>
    <div class="p-4 bg-white/6 rounded-lg mb-3">
      <h1 class="text-sm font-bold mb-3">Monitoring Settings</h1>
      <div class="flex justify-between">
        <p class="text-sm">Allow Monitoring</p>
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer">
          <div class="relative w-11 h-6 peer-focus:outline-none rounded-full peer bg-white/10 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white  after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
        </label>
      </div>
      
    </div>
    <div class="p-4 bg-white/6 rounded-lg mb-3">
      <h1 class="text-sm font-bold mb-3">Danger Zone</h1>
      <button onclick={() => { createModal("TaskDeletion") }} class="bg-gradient-to-br from-orange-500 to-orange-600 py-2 px-6 rounded-lg font-semibold w-full hover:cursor-pointer hover:shadow-lg hover:shadow-orange-500/30 transition-all">Clear Task Data</button>
    </div>
    {#if warningSave}
    <div
      in:fly={{ y: 50, duration: 200, opacity: 0.5, easing:sineIn }}
      out:fly={{ y: 50, duration: 200, opacity: 0.5, easing:sineOut }}
      class="mb-15 bg-white/6 backdrop-blur-2xl fixed bottom-0 flex items-center py-3 px-5 rounded-lg justify-between w-[63.3%]">
      <h1><span class="font-bold text-orange-500">Warning:</span> You have unsaved changes!</h1>
      <button onclick={saveConfig} class="hover:shadow-lg hover:shadow-white/6 hover:scale-105 transition-all w-50 font-bold hover:cursor-pointer rounded-lg py-2 bg-white/10">Save Settings</button>
    </div>
    {/if}
  </div>
</div>