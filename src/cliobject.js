;'use strict';

var pathBasename = require('path').basename;

var allCommands;

function printAllCommands(){
    var exp = /^function .*\((.*)\)/;

    for (var commandName in allCommands) {
        var commandFnExpression = allCommands[commandName].toString();
        var fnArgs = exp.exec(commandFnExpression)[1].split(',').slice(0, -1);
        console.log('    --' + commandName + ':' + ' ' + fnArgs);
    }
}

function getRootModule() {
    var rootModule = module;
    while(rootModule.parent){
        rootModule = rootModule.parent;
    }
    return rootModule;
}

function printUsage () {
    var filename = pathBasename(getRootModule().filename);
    console.log('Usage: ' + filename + ' [--<command> [<parameter>]*]+');
    console.log('where, command is one of:');
    printAllCommands();
    console.log('    --help');
    console.log('    -h');
}

function parseArgs(args) {
    if (args[0] === '-h' || args[0] === '--help') {
        console.log('*** Usage requested by user', args);
        printUsage();
        process.exit(0);
    }

    if (args[0] === undefined || args.length < 1 || args[0].indexOf('--') !== 0) {
        console.log('*** Incorrect arguments', args);
        printUsage();
        process.exit(1);
    }

    var commands = [];
    var currCommand = [];

    for(var i = 0 ; i < args.length ; i += 1){
        var option = args[i] || '';

        if (option.indexOf('--') === 0) { //option should be a command.
            var commandName = option.substr(2);
            if (!allCommands.hasOwnProperty(commandName)) {
                console.log('*** Invalid command: "%s"', commandName);
                printUsage();
                process.exit(1);
            }
            currCommand = [];
            currCommand.push(commandName);
            commands.push(currCommand);
        } else { // option is an option of the current command
            currCommand.push(option);
        }
    }
    return commands;
}

function executeCommands(commands){
    var i=0;

    function executeCommand(currCommandArr) {
        var commandName = currCommandArr[0];
        var commandArgs = currCommandArr.slice(1);
        var commandFn = allCommands[commandName];

        commandFn.apply(null, commandArgs.concat(function (err) {
            if (err) {
                console.error('Error executing command: %s with args: %s, error: %s', commandName, commandArgs, err);
                process.exit(1);
            }
            i += 1;
            if(i < commands.length) {
                var currCommandArr = commands[i];
                return executeCommand(currCommandArr);
            }
            return;
        }));
    }
    var currCommandArr = commands[i];
    executeCommand(currCommandArr);
}

function execute(object) {
    allCommands = object;
    var args = process.argv.slice(2);
    var commands = parseArgs(args);
    executeCommands(commands);
}

module.exports = {
    execute: execute
};
