const { parentPort, workerData } = require('worker_threads')

const { exec, execSync } = require('child_process')

// get vars
const data = workerData

const autostart = data.autostart
const runEntry = data.runEntry
const stopEntry = data.stopEntry
const selectedModel = data.selectedModel
const modelType = data.modelType

run()

async function run() {
    await installDeps()

    const dalaiFolder = 'C:\\Dalai\\dalai'
    const setPath = 'set PATH=%PATH%;C:\\Program Files\\nodejs\\;C:\\Program Files\\Git\\cmd\\;C:\\Python38;C:\\Python38\\Scripts\\ && '

    parentPort.postMessage([45.0, 'Cloning Dalai ...'])
    await runSync('mkdir C:\\Dalai')
    await runSync(setPath + 'powershell.exe -command "cd C:\\Dalai ; git clone https://github.com/cocktailpeanut/dalai')

    parentPort.postMessage([55.0, "Installing Dalai ..."])
    await runSync(setPath + 'cd ' + dalaiFolder + ' && npm install')

    parentPort.postMessage([60.0, "Installing Alpaca ..."])
    console.log("Now installing alpaca ( fat, takes long time )")
    await runSync(setPath + 'cd ' + dalaiFolder + ' && npx dalai ' + modelType + ' install ' + selectedModel)

    parentPort.postMessage([90.0, "Setup entires ..."])
    await setupEntries(dalaiFolder, autostart, runEntry, stopEntry)

    parentPort.postMessage("finished")
}

async function installDeps() {
    // install coco to install docker and npm
    parentPort.postMessage([0.0, 'Installing Chocolatey ...'])
    console.log("Installing Choco")
    await runSync('powershell.exe Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString(\'https://community.chocolatey.org/install.ps1\'))')

    // choco installed, now get npm and other dependencies
    const chocoPath = 'C:\\ProgramData\\chocolatey\\bin\\choco.exe'
    await runSync('set PATH=%PATH%;C:\\ProgramData\\chocolately\\bin')

    parentPort.postMessage([5.0, 'Installing Npm ...'])
    console.log("Installing Npm")
    await runSync(chocoPath + ' install nodejs -y')

    parentPort.postMessage([10.0, 'Installing Python ...'])
    console.log("Installing Python")
    await runSync(chocoPath + ' install python --version=3.8.0 -y')

    parentPort.postMessage([15.0, 'Installing Git ...'])
    console.log("Installing Git")
    await runSync(chocoPath + ' install git -y')

    parentPort.postMessage([20.0, 'Installing MS Visual C++ Runtime ...'])
    console.log("Installing MS Visual C++ Runtime")
    await runSync(chocoPath + ' install vcredist-all -y')

    parentPort.postMessage([25.0, 'Installing Cmake ...'])
    console.log("Installing Cmake")
    await runSync(chocoPath + ' install make -y')

    parentPort.postMessage([30.0, 'Installing MS Visual Studio ...'])
    console.log("Installing VS")
    await runSync(chocoPath + ' install visualstudio2019community -y')
    await runSync(chocoPath + ' install visualstudio2019buildtools -y')
    await runSync(chocoPath + ' install visualstudio2019-workload-vctools -y')
}

async function setupEntries(dalaiFolder, autostart, runEntry, stopEntry) {
    // create entries
    if (runEntry) {
        // start entry
        const fs = require('fs');
        try { fs.writeFileSync('C:\\Dalai\\start.bat', 'cd ' + dalaiFolder + ' && PowerShell -Command "Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::Show(\'Starting Dalai server ...\', \'Dalaix by Ben Herbst\')" && npx dalai serve', 'utf-8'); }
        catch (e) {
            alert('Failed to save the start batch !');
        }
        await runSync('powershell.exe -command "New-Item -ItemType SymbolicLink -Path C:\\Dalai\\start.bat -Target "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\" -Name "Start Dalai"')
    }

    if (autostart) {
        // start entry
        const fs = require('fs');
        try { fs.writeFileSync('C:\\Dalai\\autostart.bat', 'cd ' + dalaiFolder + ' && npx dalai serve', 'utf-8'); }
        catch (e) {
            alert('Failed to save the autostart batch !');
        }
        await runSync('powershell.exe -command "New-Item -ItemType SymbolicLink -Path C:\\Dalai\\autostart.bat -Target "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp\\" -Name "Autostart Dalai"')
    }

    if (stopEntry) {
        // install kill port to stop the server
        await runSync('npm install -g kill-port')

        // stop entry
        const fs = require('fs');
        try { fs.writeFileSync('C:\\Dalai\\stop.bat', 'cd ' + dalaiFolder + ' && PowerShell -Command "Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::Show(\'Stopping Dalai server ...\', \'Dalaix by Ben Herbst\')" && npx kill-port 3000', 'utf-8'); }
        catch (e) {
            alert('Failed to save the stop batch !');
        }
        await runSync('powershell.exe -command "New-Item -ItemType SymbolicLink -Path C:\\Dalai\\stop.bat -Target "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\" -Name "Stop Dalai"')
    }
}

function runSync(command) {
    return new Promise((resolve, reject) => {
        exec(command, { maxBuffer: 1024 * 1024 * 1024 }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout)
        })
    })
}