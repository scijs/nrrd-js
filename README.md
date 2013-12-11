NRRD support for Javascript
===========================

This can parse and serialize files in the [Nearly Raw Raster Data format](http://teem.sourceforge.net/nrrd/). Currently it only supports inline data (although in principle there is parsing support for datafile, and if you take care of the external data yourself writing headers using external data should also work).

To use with [ndarray](https://github.com/mikolalysenko/ndarray), proceed as follows:

```javascript
var nrrdfile = nrrd.parse(...);
var array = ndarray(nrrdfile.data, nrrdfile.sizes.slice().reverse());
var arrayBuffer = nrrd.serialize({data: array.data, sizes: array.shape.slice().reverse()});
// If array.data is something other than a typed array, you should specify the 'type'.
```
