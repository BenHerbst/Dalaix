import InstallWorker from './installWorker?nodeWorker'

var progress = 0.0
var progressText = 'Not started yet ...'

export function install(autostart, runEntry, stopEntry, selectedModel, modelType, mainWindow, installDirectory) {

  // everything here with threads
  const installWorker = new InstallWorker({ workerData: { autostart, runEntry, stopEntry, selectedModel, modelType, installDirectory } })

  installWorker.on("message", msg => {
    if (msg !== "finished") {
      // not finished yet
      // 0 = percentage
      // 1 = text
      progress = msg[0]
      progressText = msg[1]
    } else {
      // finished
      progress = 100.0
      progressText = "Successfully installed Dalai"
    }
    mainWindow.webContents.send("progressed")
  });

  installWorker.on("error", error => {
    console.log(error);
  });

  installWorker.on("exit", exitCode => {
    console.log(exitCode);
  })
}

export function getProgress() {
  return progress
}

export function getProgressText() {
  return progressText
}