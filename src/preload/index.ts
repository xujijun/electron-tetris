import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  addHighScore: (username: string, score: number) =>
    ipcRenderer.invoke('add-high-score', username, score),
  getHighestScore: () => ipcRenderer.invoke('get-highest-score'),
  onHighScoreCleared: (callback) => ipcRenderer.on('high-score-cleared', callback) //声明一个可以绑定事件high-score-cleared处理器callback的api
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
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
