var _path = require ("path");
var _fs = require ("fs");
var _cp = require ("child_process");
var _os = require ("os");

// fileExists - internal helper function because the Node.js "fs" package has
// deprecated the "exists" method, and the "approved" async way of getting stat throws
// an exception if the file doesn't exist (who is responsible for the API design here?
// amateur much?)
var fileExists = function (path) {
    try {
        var stats = _fs.statSync (path);
        return true;
    }
    catch (exc) {
    }
    return false;
};

// runReturn - internal helper function to synchronously run npm and return the output
// as a string (capability like this should be a built-in, IMNSHO)
var runNpm = function (command) {
    var result = "";
    var outputName = _path.join (__dirname, "" + Date.now ());
    process.stderr.write (outputName + "\n");
    var npm = _path.join(__dirname, "npm.js");
    var options = { stdio: ["ignore", 1, 2] };
    _cp.spawnSync("node", [npm, command, outputName], options);
    // read the output file back in
    result = _fs.readFileSync(outputName, "utf8");

    // chop off the newline
    result = result.substr (0, result.length - 1);
    _fs.unlinkSync(outputName);
    return result;
}

var requireAuto = function (name) {
    // WELLLLL (church lady voice) - npm is *SPECIAL*. Rather than try to look simply
    // for where npm will put the included packages, I'll just ask npm directly
    var path = runNpm ("root");
    process.stderr.write ("Path (" + path + ")\n");

    // figure out where our package should be
    var package = _path.join (path, name);
    process.stderr.write ("Package (" + package + ")\n");
    if (! fileExists (package)) {
        process.stderr.write ("install (" + name + ")\n");
        var options = { stdio: [0, 1, 2] };
        _cp.spawnSync("pwd", options);
        _cp.spawnSync("npm", ["install", name], options);
    }
    return require (name);
};

module.exports = requireAuto;
