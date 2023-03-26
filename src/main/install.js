import installDeps from './installDependencies'
import setupEntries from './setupEntries'

export default function install(event, autostart, runEntry, stopEntry, selectedModel, modelType) {
  var cmd = require('node-cmd')

  installDeps(cmd)

  // update session path
  const setPath = 'set PATH=%PATH%;C:\\Program Files\\nodejs\\;C:\\Program Files\\Git\\cmd\\;C:\\Python38;C:\\Python38\\Scripts\\ && '
  logOutput(cmd.runSync('set PATH=%PATH%;C:\\Program Files\\nodejs\\;C:\\Program Files\\Git\\cmd\\;C:\\Python38;C:\\Python38\\Scripts\\'));

  // get Dalai
  const dalaiFolder = 'C:\\Dalai\\dalai'

  console.log("Downloading Dalai")
  logOutput(cmd.runSync("mkdir C:\\Dalai"))
  logOutput(cmd.runSync(setPath + 'powershell.exe -command "cd C:\\Dalai ; git clone https://github.com/cocktailpeanut/dalai'))

  logOutput(cmd.runSync(setPath + 'cd ' + dalaiFolder + ' && npm install'))

  console.log("Now installing alpaca ( fat, takes long time )")
  logOutput(cmd.runSync(setPath + 'cd ' + dalaiFolder + ' && npx dalai ' + modelType + ' install ' + selectedModel))

  setupEntries(cmd, dalaiFolder, autostart, runEntry, stopEntry)

  // serve Dalai
  cmd.run(setPath + 'cd ' + dalaiFolder + ' && npx dalai serve')

  // open browser
  cmd.run('rundll32 url.dll,FileProtocolHandler http://localhost:3000/')

  console.log("Finished")
}

export function logOutput(syncCmd) {
  console.log(`
    
        Sync Err ${syncCmd.err}
        
        Sync stderr:  ${syncCmd.stderr}

        Sync Data ${syncCmd.data}
    
    `);
}
