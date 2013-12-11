var nrrd = require('./nrrd.js');
var fs = require('fs');

var data1 = nrrd.parse(fs.readFileSync('example2.nrrd'));

console.log(data1);

var data2 = {data: [1, 2, 3, 4, 5, 6], type: 'unsigned char', encoding: 'text', sizes: [3, 2]};
fs.writeFileSync('example3.nrrd', new Buffer(new Uint8Array(nrrd.serialize(data2))));
//console.log(nrrd.serialize(data2));
