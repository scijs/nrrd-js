NRRD support for Javascript
===========================

This can open files in the [Nearly Raw Raster Data format](http://teem.sourceforge.net/nrrd/). Currently it only supports inline data (although in principle there is parsing support for datafile), and has only limited "intelligence", but it can be still be useful.

To use with [ndarray](https://github.com/mikolalysenko/ndarray), proceed as follows:

```javascript
var nrrdfile = nrrd.parse(...);
var array = ndarray(nrrdfile.data, nrrdfile.sizes.slice().reverse());
```

Planned: saving NRRD files as well as opening them.