import { logOutput } from './install'

export default function setupEntries(dalaiFolder, autostart, runEntry, stopEntry) {
    // create entries
    if (runEntry) {
        // start entry
        const fs = require('fs');
        try { fs.writeFileSync('C:\\Dalai\\start.bat', 'cd ' + dalaiFolder + ' && npx dalai && msg * Starting Daila Server', 'utf-8'); }
        catch (e) {
            alert('Failed to save the file !');
        }
    }

    if (autostart) {
        // start entry
        const fs = require('fs');
        try { fs.writeFileSync('C:\\Dalai\\autostart.bat', 'cd ' + dalaiFolder + ' && npx dalai', 'utf-8'); }
        catch (e) {
            alert('Failed to save the file !');
        }
    }

    if (stopEntry) {
        // stop entry
        const fs = require('fs');
        try { fs.writeFileSync('C:\\Dalai\\start.bat', 'cd ' + dalaiFolder + ' && npx dalai && msg * Stopping Daila Server', 'utf-8'); }
        catch (e) {
            alert('Failed to save the file !');
        }
    }
}