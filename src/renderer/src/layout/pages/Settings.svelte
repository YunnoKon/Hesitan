<script>
  import { createAlert } from "../../states/PopUpState.svelte"

  // Initialize State
  let config = $state({
    keys:{
      google:""
    }
  })
  let toggle = $state({
    visibility:{
      google:false
    }
  })
  
  // Initialize Config
  window.electron.ipcRenderer.send('config.get')
  window.electron.ipcRenderer.once('response.get',(_,args) => {
    config = args;
  })
  
  const saveConfig = () => {
    window.electron.ipcRenderer.send('config.save',$state.snapshot(config))
    createAlert("Settings: Changes Saved")
  }
</script>

<div class="bg-gradient-to-br from-[#0f1115] to-[#0b0c0f] text-white fixed h-[calc(100%-50px)] w-[80%] mx-3 mb-4 border-2 border-gray-700/50 rounded-xl right-0 overflow-y-auto">
  <div class="px-[10%] py-[5%] h-full relative">
    <h1 class="text-4xl font-black mb-5">Settings</h1>
    <form onsubmit={(e) => { e.preventDefault(); saveConfig() }}>
      <label class="flex flex-col mb-4">
        <p class="text-lg text-orange-500 font-semibold mb-2">Google API Key</p>
        <div class="w-full flex gap-2">
          <input bind:value={config.keys.google} placeholder="Keep your key secured..." class="bg-white/6 backdrop-blur-sm focus:outline-none w-full rounded-lg py-2 px-3" type={ toggle.visibility.google ? 'text' : 'password'}/>
          <button onclick={() => { toggle.visibility.google = !toggle.visibility.google }} type="button" class="hover:scale-110 transition-all duration-300 cursor-pointer block bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg">
            <img src={ toggle.visibility.google ? 'src/assets/eye.svg' : 'src/assets/eye-slash.svg'} alt="icon" class="w-6"/>
          </button>
        </div>
      </label>
      <button class="font-dot text-xl font-semibold hover:text-orange-500 hover:cursor-pointer" type="submit">Save &gt;</button>
    </form>
  </div>
</div>