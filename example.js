var nrrd = require('./nrrd.js');
var fs = require('fs');

var data = nrrd.parse(fs.readFileSync('example2.nrrd'));

console.log(data);
