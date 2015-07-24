# cliobject
Node.js library for creating CLI (Command-Line-Interface) utilities from your Node.js Objects. Automatically.

Your object's methods can be called from the command line, passing needed parameters.

CLI help is automatically generated for you.

## wrapped object requirements
Currently, your object is expected to callback when finished. Callback function must be the last parameter of your function.

In the future, synchonous objects (ie. that do not callback) could be supported.

## usage sample
See complete usage code samples: [./samples/](./samples/)

You want to call some utilities you have implemented with Node. Let's supose you have an utility object for creating files and removing them:
```javascript
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
```

By using **objectcli** you can use your object directly from the command-line. You write your CLI tool with **objectcli**:
```javascript
var someFileActions = require('./someFileActions');
var cliobject = require('../src/cliobject');

cliobject.execute(someFileActions);
```

And execute it from the command-line; help is auto-generated for you:
```bash
$ ./cliFileActions.sample.js --help
*** Usage requested by user [ '--help' ]
Usage: cliFileActions.sample.js [--<command> [<parameter>]*]+
where, command is one of:
    --createFile: filename, data
    --rmFile: filename
    --help
    -h
```
**NOTE** that your commands and parameters are extracted from your object.

Now, we can execute a command:
```bash
$ ./cliFileActions.sample.js --createFile hi_cli.txt 'this is my data'
$ more hi_cli.txt 
this is my data
```

We can also execute many commands (they are executed sequentially):
```bash
$ ./cliFileActions.sample.js --createFile second.txt 'some contents' --rmFile hi_cli.txt
$ more hi_cli.txt 
hi_cli.txt: No such file or directory
$ more second.txt 
some contents
```
