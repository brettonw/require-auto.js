#! /usr/local/bin/node

var requireAuto = require ("..");

var _ns = requireAuto ("namespace-include")
    .include ("output");
stdout.writeln ("YES!");
