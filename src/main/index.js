import { app, shell, BrowserWindow, ipcMain, safeStorage } from 'electron'
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon_2.png?asset'
import { promises as fs } from 'fs';

// AI agent utilities & tools
import Schema from './schema';
import Prompt from './prompt.json';
import { Agent } from "@mastra/core/agent";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
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

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

let configPath = join(app.getPath('userData'), 'app_config.enc');

async function storeConfig(config){
  if(safeStorage.isEncryptionAvailable()){
    const jsonString = JSON.stringify(config)
    const encrypted = safeStorage.encryptString(jsonString)
    await fs.writeFile(configPath, encrypted);
  }
}

async function getConfig() {
  if (safeStorage.isEncryptionAvailable()) {
    const encrypted = await fs.readFile(configPath);
    if (encrypted) {
      const buffer = Buffer.from(encrypted, 'base64');
      return JSON.parse(safeStorage.decryptString(buffer));
    }
  }
  return null;
}

function replaceTemplate(template, data) {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in data ? data[key] : match
  );
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

  // IPC test
  ipcMain.on('config.save', (_,args) => {
    storeConfig(args)
  })

  ipcMain.on('config.get', async(_,args) => {
    const windows = BrowserWindow.getAllWindows();
    const mainWindow = windows[0];
    mainWindow.webContents.send('response.get',await getConfig());
  })

  ipcMain.on('agent.roadmap', async(_,args) => {
    const { createGoogleGenerativeAI } = await import("@ai-sdk/google");
    let config = await getConfig()
    let provider = createGoogleGenerativeAI({
      apiKey:config.keys.google
    })
    let agent = new Agent({
      name: "Roadmap Assistant",
      model: provider(args.modelName, {
        useSearchGrounding:true,
      }),
      instructions: "You are a helpful assistant",
    });
    const response = await agent.generate([
      {
        role: "system",
        content: replaceTemplate(Prompt.roadmap,{
          startDate:"18/7/2025",
          endDate:"20/7/2025"
        })
      },
      { role: "user", content: args.userPrompt },
    ],{
        output: Schema.roadmap
    });
    console.log(response.object)
  })

  createWindow()

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
