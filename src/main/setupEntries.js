import { logOutput } from './install'

export default function setupEntries(dalaiFolder, autostart, runEntry, stopEntry) {
    // create entries
    if (runEntry) {
        // start entry
        const fs = require('fs');
        try { fs.writeFileSync('C:\\Dalai\\start.bat', 'cd ' + dalaiFolder + ' && msg * Starting Daila Server && npx dalai serve', 'utf-8'); }
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
        // stop entry
        const fs = require('fs');
        try { fs.writeFileSync('C:\\Dalai\\stop.bat', 'cd ' + dalaiFolder + ' && msg * Stopping Daila Server && npx dalai serve', 'utf-8'); }
        catch (e) {
            alert('Failed to save the stop batch !');
        }
    }
}