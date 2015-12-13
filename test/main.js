#! /usr/local/bin/node

var requireAuto = require ("..");

requireAuto ("namespace-include")
    .include ("output");
stdout.writeln ("YES!");
