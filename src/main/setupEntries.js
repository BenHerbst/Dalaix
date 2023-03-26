import { logOutput } from './install'

export default function setupEntries(cmd, dalaiFolder, autostart, runEntry, stopEntry) {
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