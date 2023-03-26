import { logOutput } from './install'

export default function installDeps(cmd) {
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