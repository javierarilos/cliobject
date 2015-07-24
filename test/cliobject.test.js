'use strict';

var sinon = require("sinon");
var assert = require("chai").assert;

var cliobject = require("../src/cliobject");

suite('cliobject', function () {
    var myObject;
    setup(function () {
        myObject = {
            actionOne: sinon.spy(),
            actionTwo: sinon.spy()
        };

    });

    suite('#execute', function () {
        test('Should call myObject.actionOne when process.argv[2] is "--actionOne"', function () {
            var actionOneCommand = "--actionOne";
            process.argv[2] = actionOneCommand;

            cliobject.execute(myObject);

            sinon.assert.calledOnce(myObject.actionOne);
        });

        test('Should call myObject.actionOne with parameters from ARGV', function () {
            var actionOneCommand = "--actionOne";
            var param1 = "param1";
            var param2 = "param2";
            process.argv[2] = actionOneCommand;
            process.argv[3] = param1;
            process.argv[4] = param2;

            cliobject.execute(myObject);

            sinon.assert.calledWith(myObject.actionOne, param1, param2);
        });

        test('Should call myObject.actionOne with a callback as last parameter', function () {
            var actionOneCommand = "--actionOne";
            var param1 = "param1";
            var param2 = "param2";
            process.argv[2] = actionOneCommand;
            process.argv[3] = param1;
            process.argv[4] = param2;

            cliobject.execute(myObject);

            var lastArgument = myObject.actionOne.lastCall.args.pop();

            assert.isFunction(lastArgument);
        });
    });

});
