# auto-require.js
require.js - with automatic download

A lot of people seem to hate having to "require" the packages they always use, and there
are good packages for requiring all the packages you need automatically.

This package addresses a slightly different problem, I always forget to "npm install" my
packages when I first install the build in a new location, and then I spend ten minutes
debugging the problem. This package will notice that a package hasn't been installed and
just do it.

_NOTE_: `npm` doesn't work with cygwin, so I added a workaround for my environment that 
calls 'bash' directly. Of course, this means the package won't work on vanilla Windows
now.

Usage:

    var requireAuto = require ("require-auto");
    var myPackage = requireAuto ("myPackage");
