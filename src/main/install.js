import InstallWorker from './installWorker?nodeWorker'

export default function install(event, autostart, runEntry, stopEntry, selectedModel, modelType) {

  // everything here with threads
  const installWorker = new InstallWorker()

  installWorker.once("message", result => {
    console.log(result)
  });

  installWorker.on("error", error => {
    console.log(error);
  });

  installWorker.on("exit", exitCode => {
    console.log(exitCode);
  })
}