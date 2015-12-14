// process.argv[0] = node
// process.argv[1] = scriptname.js
// process.argv[2] = url
// process.argv[3] = destination

var _fs = require ("fs");
var _http = require ("http");

var myRequest = _http.request(process.argv[2], function(response) {
    var chunks = [];
    var received = 0;
    var total = response.headers["content-length"];
    
    process.stderr.write ("(OPEN) " + process.argv[2] + " (" + total + " bytes)\n");
    
    //response.setEncoding("binary");
    response.on("data", function (chunk) { 
        received += chunk.length;
        process.stderr.write ("(" + Math.floor (100 * received / total) + "%) - ");
        process.stderr.write ("Received " + chunk.length + " bytes for " + received + "/" + total + "\n");
        chunks.push(chunk); 
    });
    
    response.on("end", function() { 
        _fs.writeFileSync(process.argv[3], Buffer.concat(chunks)); 
        process.stderr.write ("(SAVE) " + process.argv[3] + "\n");
    });
});

myRequest.on("error", function(error) {
    process.stderr.write ("(ERROR) " + error);
});

myRequest.end ();
