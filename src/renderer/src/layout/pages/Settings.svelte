<script>
  import { createAlert } from "../../states/PopUpState.svelte"

  // Initialize State
  let config = $state({
    preferredProvider:"google",
    providerConfig:{
      google:{
        key:""
      },
      openai:{
        key:""
      },
      anthropic:{
        key:""
      }
    }
  })

  let providerList = $derived(Object.keys(config.providerConfig))
  let toggleVisibility = $state({
    key: false
  })
  
  // Initialize Config
  window.api.getConfig().then((args) => {
    config = args;
  })
  
  const saveConfig = () => {
    window.api.saveConfig($state.snapshot(config))
    createAlert("Settings: Changes Saved")
  }
</script>

<div class="bg-gradient-to-br from-[#0f1115] to-[#0b0c0f] text-white fixed h-[calc(100%-50px)] w-[80%] mx-3 mb-4 border-2 border-gray-700/50 rounded-xl right-0 overflow-y-auto">
  <div class="px-[10%] py-[5%] h-full relative">
    <h1 class="text-4xl font-black mb-5">Settings</h1>
    <div class="flex gap-2 mb-3">
      {#each providerList as prov}
        <button onclick={() => { config.preferredProvider = prov }} class="{config.preferredProvider==prov ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-white/6 hover:bg-white/12'} p-2 rounded-lg hover:cursor-pointer hover:scale-110 transition-all">
          <img src="provider/{prov}.svg" alt={prov} class="w-6"/>
        </button>
      {/each}
    </div>
    <div class="p-4 bg-white/6 rounded-lg mb-3">
      <h1 class="text-sm font-bold mb-3">Provider Settings</h1>
      <p class="text-orange-500 font-semibold">API Key</p>
      <div class="w-full flex gap-2">
          <input bind:value={config["providerConfig"][config.preferredProvider]["key"]} placeholder="Keep your key secured..." class="bg-white/6 backdrop-blur-sm focus:outline-none w-full rounded-lg py-2 px-3" type={ toggleVisibility.key ? 'text' : 'password'}/>
          <button onclick={() => { toggleVisibility.key = !toggleVisibility.key }} type="button" class="hover:scale-110 transition-all duration-300 cursor-pointer block bg-white/6 p-2 rounded-lg">
            <img src={ toggleVisibility.key ? 'eye.svg' : 'eyeoff.svg'} alt="icon" class="w-6"/>
          </button>
      </div>
    </div>
    <div class="p-4 bg-white/6 rounded-lg mb-3">
      <h1 class="text-sm font-bold mb-3">Danger Zone</h1>
      <button class="bg-gradient-to-br from-orange-500 to-orange-600 py-2 px-6 rounded-lg font-semibold w-full hover:cursor-pointer hover:shadow-lg hover:shadow-orange-500/30 transition-all">Clear Task Data</button>
    </div>
    <button onclick={saveConfig} class="hover:shadow-lg hover:shadow-white/6 hover:scale-105 transition-all w-50 font-bold hover:cursor-pointer rounded-lg py-2 bg-white/6">Save Settings</button>
  </div>
</div>