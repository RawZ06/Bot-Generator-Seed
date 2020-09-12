const fs = require('fs');

function filename() {
    var datetime = new Date();
    return __basedir + "/logs/" + datetime.toISOString().slice(0,10) + "_log.txt"
}

function log(message) {
    fs.appendFile(filename(), "[" + new Date().toLocaleString("fr-FR", {timeZone: "Europe/Paris"}) + "] " + message + "\n", (err) => {
        if (err) throw err;
    });
}

module.exports = log;