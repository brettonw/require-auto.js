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

// npmRoot - internal helper function to... WELLLLL (church lady voice) - npm is 
// *SPECIAL*. Rather than try to look simply for where npm will put the included
// packages, I'll have to ask npm directly
var npmRoot = function () {
    // compute a temporary name for the file I want to use to facilitate my synchronous
    // execution of the npm root command
    var outputName = _path.join (__dirname, "" + Date.now ());
    //process.stderr.write ("OutputName: " + outputName + "\n");

    // compute the path of the npm.js script, and set up the options to run it
    var npmjs = _path.join(__dirname, "npm.js");
    //process.stderr.write ("NPM.js: " + npmjs + "\n");
    var options = { stdio: ["ignore", 1, 2] };
    _cp.execSync("node " + npmjs + " root " + outputName, options);

    // read the output file back in, then remove it, and trim the return
    var result = _fs.readFileSync(outputName, "utf8");
    _fs.unlinkSync(outputName);
    return result.trim ();
} ();
//process.stderr.write ("npm root (" + npmRoot + ")\n");

var requireAuto = function (name) {
    // figure out where our package should be
    var package = _path.join (npmRoot, name);
    //process.stderr.write ("Package (" + package + ")\n");
    if (! fileExists (package)) {
        //process.stderr.write ("install (" + name + ")\n");
        
        // Isn't that *SPECIAL* (church lady voice) - npm doesn't like cygwin
        // which means this program won't work on vanilla windows now...
        var options = { stdio: [0, 1, 2] };
        _cp.execSync("bash -c 'pwd; npm install " + name + "'", options);
    }
    return require (name);
};

module.exports = requireAuto;
