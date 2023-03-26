import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  install: function (autostart, runEntry, stopEntry, selectedModel, modelType) {
    ipcRenderer.invoke('install', autostart, runEntry, stopEntry, selectedModel, modelType)
  },
  closeApp: () => {
    // quit the app
    ipcRenderer.invoke('quit')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
