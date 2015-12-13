// process.argv[0] = node
// process.argv[1] = npm.js
// process.argv[2] = command
// process.argv[3] = destination

var _fs = require ("fs");
var _exec = require("child_process").exec;

var child = _exec("npm " + process.argv[2], function (error, stdout, stderr) {
    if (! error) {
        // capture stdout to a file
        _fs.appendFile(process.argv[3], stdout, function (err) {
            if (err) throw err;
        })
    process.stderr.write (stderr);
    } else  {
        process.stderr.write ("exec error: " + error + "\n");
    }
});
