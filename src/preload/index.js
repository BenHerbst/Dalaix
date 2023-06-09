import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  install: function (autostart, runEntry, stopEntry, selectedModel, modelType, installDirectory) {
    ipcRenderer.invoke('install', autostart, runEntry, stopEntry, selectedModel, modelType, installDirectory)
  },
  closeApp: () => {
    // quit the app
    ipcRenderer.invoke('quit')
  },
  getInstallProgress: () => {
    return ipcRenderer.invoke('getInstallProgress')
  },
  onProgress: (func) => {
    ipcRenderer.on('progressed', func)
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
