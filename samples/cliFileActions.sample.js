#!/usr/bin/env node
;'use strict';

var someFileActions = require('./someFileActions');
var cliobject = require('../src/cliobject');

cliobject.execute(someFileActions);
