//const PageObject = require('./PageObject');
//const fs = require('fs');
const dir = require('node-dir');

var __dirname = './features/pageDefs/';
const file = '*.json';

process.argv.forEach(function (value, index, array) {
    if (value.startsWith('--world-parameters=')) {
      const worldParams = value.split('=')[1];
      log.debug('Found World parameters: ' + worldParams);
      world.args = JSON.parse(worldParams);
    }
  });

  dir.paths(__dirname, true, function(err, paths) {
    if (err) throw err;
     // include only certain filenames
     paths.filter.filename
     console.log('paths:\n',paths);

});

dir.files(__dirname, function(err, files) {
    if (err) throw err;
    // sort ascending
    files.sort();
    // sort descending
    files.reverse();
    // include only certain filenames
    files = files.filter(function (file) {
       return ['allowed', 'file', 'names'].indexOf(file) > -1;
    });
    // exclude some filenames
    //files = files.filter(function (file) {
    //    return ['exclude', 'these', 'files'].indexOf(file) === -1;
    //});
    console.log('JSONs:\n',files);

});

dir.readFiles(

    './features', // the root path
    // an options object
    {
        match: /.json$/, // only match json files
        recursive: true // only the root dir
    },
 
    function (err, content, filename, next) {
        if (err) {
            console.log(err);
        } else {
            console.log("fn: " + filename);
        }
    }
);
