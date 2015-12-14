#! /usr/local/bin/node

var requireAuto = require ("..");

var _ns =requireAuto ("namespace-include");
_ns.include ("output");
stdout.writeln ("YES!");
