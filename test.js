var test = require('tape');
var nrrd = require('./nrrd.js');
var ndarray = require('ndarray');
var fs = require('fs');

test("binaryInlineFile", function (t) {
    var file = nrrd.parse(fs.readFileSync('example1.nrrd'));
    
    t.equal(file.type, 'uint8');
    t.equal(file.dimension, 3);
    t.equal(file.sizes.length, 3);
    t.equal(file.sizes[0], 3);
    t.equal(file.sizes[1], 512);
    t.equal(file.sizes[2], 512);
    t.equal(file.data.length, 3*512*512);
    
    t.end();
});

test("textInlineFile", function (t) {
    var file = nrrd.parse(fs.readFileSync('example2.nrrd')),
        i, list = [1,2,3, 65000,64000,63000, 10000,11000,12000, 4,5,6];
    
    t.equal(file.type, 'uint16');
    t.equal(file.dimension, 2);
    t.equal(file.sizes.length, 2);
    t.equal(file.sizes[0], 3);
    t.equal(file.sizes[1], 4);
    t.equal(file.data.length, 3*4);
    t.equal(file.data.byteLength, 3*4*2);
    
    for(i=0; i<list.length; i++) {
        t.equal(file.data[i], list[i]);
    }
    
    t.end();
});

test("roundtrip", function (t) {
    var file = nrrd.parse(nrrd.serialize(nrrd.parse(fs.readFileSync('example2.nrrd')))),
        i, list = [1,2,3, 65000,64000,63000, 10000,11000,12000, 4,5,6];
    
    t.equal(file.type, 'uint16');
    t.equal(file.dimension, 2);
    t.equal(file.sizes.length, 2);
    t.equal(file.sizes[0], 3);
    t.equal(file.sizes[1], 4);
    t.equal(file.data.length, 3*4);
    t.equal(file.data.byteLength, 3*4*2);
    
    for(i=0; i<list.length; i++) {
        t.equal(file.data[i], list[i]);
    }
    
    t.end();
});

test("ndarray", function (t) {
    var file = nrrd.parse(fs.readFileSync('example2.nrrd')),
        i, j, list = [[1,2,3], [65000,64000,63000], [10000,11000,12000], [4,5,6]],
        arr = ndarray(file.data, file.sizes.slice().reverse());
    
    t.equal(file.dimension, 2);
    t.equal(file.sizes[0], arr.shape[1]);
    t.equal(file.sizes[1], arr.shape[0]);
    
    for(i=0; i<list.length; i++) {
        for(j=0; j<list[i].length; j++) {
            t.equal(arr.get(i,j), list[i][j]);
        }
    }
    
    t.end();
});

test("ndarray serialization", function (t) {
    var i, j, list = [[1,2,3], [65000,64000,63000], [10000,11000,12000], [4,5,6]],
        arr1 = ndarray(new Uint16Array([1,2,3, 65000,64000,63000, 10000,11000,12000, 4,5,6]), [4,3]),
        file = nrrd.parse(nrrd.serialize({data: arr1.data, sizes: arr1.shape.slice().reverse()})),
        arr2 = ndarray(file.data, file.sizes.slice().reverse());;
    
    t.equal(file.dimension, arr1.shape.length);
    t.equal(file.sizes[0], arr1.shape[1]);
    t.equal(file.sizes[1], arr1.shape[0]);
    t.equal(file.type, "uint16");
    
    for(i=0; i<list.length; i++) {
        for(j=0; j<list[i].length; j++) {
            t.equal(arr1.get(i,j), arr2.get(i,j));
        }
    }
    
    t.end();
});
