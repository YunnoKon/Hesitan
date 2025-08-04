import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import { handlers } from './handlers';
import { events } from './events'

let mainWindow, widget;

// Handling second instance
// may need rewrite after changes to multi-window
/*
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) app.quit()

app.on('second-instance', () => {
  const windows = BrowserWindow.getAllWindows()
  if (windows.length > 0) {
    const mainWindow = windows[0]
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    }
    mainWindow.focus()
  }
})
*/

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    icon,
    titleBarOverlay:{
      color: '#000000',
      symbolColor: '#fff',
      height: 30
    },
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('close',() => {
    if(mainWindow.isVisible()) widget?.close()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function createWidget() {
  // Phantom titlebar issue: https://github.com/electron/electron/issues/46882
  widget = new BrowserWindow({
    width: 260,
    height: 200,
    resizable:false,
    autoHideMenuBar:true,
    transparent:true,
    alwaysOnTop:true,
    frame:false,
    show:false,
    icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  widget.on('close',() => {
    if(widget.isVisible()) mainWindow?.close()
  })

  if(is.dev && process.env['ELECTRON_RENDERER_URL']){
    widget.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/widget.html')
  } else {
    widget.loadFile(join(__dirname, '../renderer/widget.html'))
  }
}

function switchWindow() {
  if(mainWindow.isVisible()){
    widget.show()
    widget.focus()
    mainWindow.hide()
  } else {
    mainWindow.show()
    mainWindow.focus()
    widget.hide()
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Register all handlers
  Object.entries(handlers).forEach(([channel, handler]) => {
    ipcMain.handle(channel, handler)
  })

  Object.entries(events).forEach(([channel, onEvent]) => {
    ipcMain.on(channel, onEvent)
  })

  // Layer switching handler
  ipcMain.handle("layer:switch",switchWindow)

  // Layer transmitting handler
  ipcMain.handle('layer:startTask',(_,args) => {
    widget.send('layer:onTaskStart',args)
  })
  ipcMain.handle('layer:endTask',(_,args) => {
    mainWindow.send('layer:onTaskEnd',args)
  })

  createWindow()
  createWidget()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
