const { parentPort } = require('worker_threads')

var cmd = require('node-cmd')

installDeps(cmd)

const dalaiFolder = 'C:\\Dalai\\dalai'
const setPath = 'set PATH=%PATH%;C:\\Program Files\\nodejs\\;C:\\Program Files\\Git\\cmd\\;C:\\Python38;C:\\Python38\\Scripts\\ && '

console.log("Downloading Dalai")
logOutput(cmd.runSync("mkdir C:\\Dalai"))
logOutput(cmd.runSync(setPath + 'powershell.exe -command "cd C:\\Dalai ; git clone https://github.com/cocktailpeanut/dalai'))

logOutput(cmd.runSync(setPath + 'cd ' + dalaiFolder + ' && npm install'))

console.log("Now installing alpaca ( fat, takes long time )")
logOutput(cmd.runSync(setPath + 'cd ' + dalaiFolder + ' && npx dalai ' + modelType + ' install ' + selectedModel))

setupEntries(cmd, dalaiFolder, autostart, runEntry, stopEntry)

parentPort.postMessage("Finished")

function installDeps(cmd) {
    // install coco to install docker and npm
    console.log("Installing Choco")
    logOutput(cmd.runSync('powershell.exe Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString(\'https://community.chocolatey.org/install.ps1\'))'))

    // choco installed, now get docker and npm
    const chocoPath = 'C:\\ProgramData\\chocolatey\\bin\\choco.exe'
    logOutput(cmd.runSync('set PATH=%PATH%;C:\\ProgramData\\chocolately\\bin'));

    console.log("Installing Npm")
    logOutput(cmd.runSync(chocoPath + ' install nodejs -y'))

    console.log("Installing Python")
    logOutput(cmd.runSync(chocoPath + ' install python --version=3.8.0 -y'))

    console.log("Installing Git")
    logOutput(cmd.runSync(chocoPath + ' install git -y'))

    console.log("Installing MS Visual C++ Runtime")
    logOutput(cmd.runSync(chocoPath + ' install vcredist-all -y'))

    console.log("Installing Cmake")
    logOutput(cmd.runSync(chocoPath + ' install make -y'))

    console.log("Installing VS")
    logOutput(cmd.runSync(chocoPath + ' install visualstudio2019community -y'))
    logOutput(cmd.runSync(chocoPath + ' install visualstudio2019buildtools -y'))
    logOutput(cmd.runSync(chocoPath + ' install visualstudio2019-workload-vctools -y'))
}

function setupEntries(cmd, dalaiFolder, autostart, runEntry, stopEntry) {
    // create entries
    if (runEntry) {
        // start entry
        const fs = require('fs');
        try { fs.writeFileSync('C:\\Dalai\\start.bat', 'cd ' + dalaiFolder + ' && PowerShell -Command "Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::Show(\'Starting Dalai server ...\', \'Dalaix by Ben Herbst\')" && npx dalai serve', 'utf-8'); }
        catch (e) {
            alert('Failed to save the start batch !');
        }
    }

    if (autostart) {
        // start entry
        const fs = require('fs');
        try { fs.writeFileSync('C:\\Dalai\\autostart.bat', 'cd ' + dalaiFolder + ' && npx dalai serve', 'utf-8'); }
        catch (e) {
            alert('Failed to save the autostart batch !');
        }
    }

    if (stopEntry) {
        // install kill port to stop the server
        logOutput(cmd.runSync('npm install -g kill-port'))

        // stop entry
        const fs = require('fs');
        try { fs.writeFileSync('C:\\Dalai\\stop.bat', 'cd ' + dalaiFolder + ' && PowerShell -Command "Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::Show(\'Stopping Dalai server ...\', \'Dalaix by Ben Herbst\')" && npx kill-port 3000', 'utf-8'); }
        catch (e) {
            alert('Failed to save the stop batch !');
        }
    }
}

function logOutput(syncCmd) {
    console.log(`
    
        Sync Err ${syncCmd.err}
        
        Sync stderr:  ${syncCmd.stderr}

        Sync Data ${syncCmd.data}
    
    `);
}