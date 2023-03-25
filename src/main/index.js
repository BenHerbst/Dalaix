import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  ipcMain.handle('install', async (event, autostart, runEntry, stopEntry, installNpm, installDocker, model) => {
    // const psLocation = '@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe"'
    var cmd = require('node-cmd')

    if (installDocker || installNpm) {
      // install coco to install docker and npm
      console.log("Installing Choco")
      logOutput(cmd.runSync('powershell.exe Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString(\'https://community.chocolatey.org/install.ps1\'))'))

      // choco installed, now get docker and npm
      const chocoPath = 'C:\\ProgramData\\chocolatey\\bin\\choco.exe'
      // if (installDocker) {
      //   console.log("Installing Docker")
      //   const installDocker = cmd.runSync(chocoPath + ' install docker-engine')
      //   logOutput(installDocker)
      //   console.log("Installed Docker")
      // }
      if (installNpm) {
        console.log("Installing Npm")
        logOutput(cmd.runSync(chocoPath + ' install nodejs -y'))
      }

      console.log("Installing Python")
      logOutput(cmd.runSync(chocoPath + ' install python --version=3.8.0 -y'))

      console.log("Installing Git")
      logOutput(cmd.runSync(chocoPath + ' install git -y'))

      console.log("Installing MS Visual C++ Runtime")
      logOutput(cmd.runSync(chocoPath + ' install vcredist-all -y'))

      console.log("Installing Cmake")
      logOutput(cmd.runSync(chocoPath + ' install make -y'))

      console.log("Installing VS")
      logOutput(cmd.runSync(chocoPath + ' install visualstudio2019community visualstudio2019buildtools visualstudio2019-workload-vctools -y'))

      console.log("Finished")
    }

    // get Dalai
    console.log("Downloading Dalai")
    logOutput(cmd.runSync("mkdir C:\\Dalai"))
    logOutput(cmd.runSync('powershell.exe -command "cd C:\\Dalai ; git clone https://github.com/cocktailpeanut/dalai'))

    logOutput(cmd.runSync('cd C:\\Dalai\\dalai && npm install'))

    console.log("Now installing alpaca ( fat, takes long time )")
    logOutput(cmd.runSync('cd C:\\Dalai\\dalai && npx dalai alpaca install 7B'))
    logOutput(cmd.runSync('cd C:\\Dalai\\dalai && npx dalai serve'))

    // install Dalai

    // install node
    // execute('@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString(\'https://community.chocolatey.org/install.ps1\'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"', (callback) => {
    //   console.log(callback)
    // })
    // execute(psLocation + ' dir', (callback) => {
    //   console.log(callback)
    // })
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

function logOutput(syncCmd) {
  console.log(`
    
        Sync Err ${syncCmd.err}
        
        Sync stderr:  ${syncCmd.stderr}

        Sync Data ${syncCmd.data}
    
    `);
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

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const exec = require('child_process').exec;

function execute(command, callback) {
  exec(command, (error, stdout, stderr) => {
    callback(stdout);
  });
};