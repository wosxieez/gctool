const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  connect: data => ipcRenderer.send('connect', data),
  run: data => ipcRenderer.send('run', data),
  onMessage: callback => ipcRenderer.on('message', callback)
})
