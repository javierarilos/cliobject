;'use strict';
/***
 * Just perform some simple actions to be converted into CLI by cliobject
 */

var fs = require('fs');

function createFile(filename, data, cb) {
    fs.writeFile(filename, data, cb);
}

function rmFile(filename, cb) {
    fs.unlink(filename, cb);
}

module.exports = {
    createFile: createFile,
    rmFile: rmFile
};
