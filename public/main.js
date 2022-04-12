const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const mysql = require('mysql')
let connection
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true
    }
  })

  mainWindow.loadFile('src/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (connection) connection.end()
  app.quit()
})

process.on('uncaughtException', function (error) {
  mainWindow.webContents.send('message', error.message)
})

// connect database
ipcMain.on('connect', (_, data) => {
  console.log('on connect...', data)

  connection = mysql.createConnection(data)
  connection.on('error', function (error) {
    console.log(error)
  })
  mainWindow.webContents.send('message', 'connect ok')
})

// run sql
ipcMain.on('run', (_, data) => {
  console.log('on run...', data)

  connection.query(data, function (error, results) {
    if (error) throw error

    mainWindow.webContents.send('message', JSON.stringify(results))
  })
})
