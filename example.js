var nrrd = require('./nrrd.js');
var fs = require('fs');

var img = nrrd.parse(fs.readFileSync('example1.nrrd'));

console.log(img);
