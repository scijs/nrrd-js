var test = require('tape');
var nrrd = require('./nrrd.js');
var fs = require('fs');

test("basicInlineFile", function (t) {
    var file = nrrd.parse(fs.readFileSync('example1.nrrd'));
    
    t.equal(file.type, 'uint8');
    t.equal(file.dimension, 3);
    t.equal(file.sizes.length, 3);
    t.equal(file.sizes[0], 3);
    t.equal(file.sizes[1], 512);
    t.equal(file.sizes[2], 512);
    t.equal((new Uint8Array(file.data)).length, 3*512*512);
    
    t.end();
});
