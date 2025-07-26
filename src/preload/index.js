import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  // Config
  saveConfig: (args) => ipcRenderer.invoke('config:save',args),
  getConfig: () => ipcRenderer.invoke('config:get'),

  // Agent
  chat: (args) => ipcRenderer.send('agent:chat',args),
  onChatStream: (callback) => ipcRenderer.on('agent:chatStream', (_event, value) => callback(value)),
  onRoadmapResponse: (callback) => ipcRenderer.on('agent:roadmapResponse', (_event, value) => callback(value)),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.api = api
}
