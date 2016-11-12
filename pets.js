'use strict';

module.exports = {
    "extends": "eslint:recommended"
};

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');
var cmd = process.argv[2];
var index = process.argv[3];

if (cmd === 'read') {
fs.readFile(petsPath, 'utf8', function(err, data){
  var pets = JSON.parse(data);
  if (err) {
    throw err;
  } else if (index === undefined) {
    // var pets = JSON.parse(data);
    console.log(pets);
  } else if (Number.isNaN(index) || index < 0 || index > pets.length -1) {
    console.error('Usage: ${node} ${file} ${cmd} INDEX');
  } else {
    console.log(pets[index]);
  }
});
// } else if (cmd === 'create'){
//   fs.readFile(petsPath, 'utf8', function(readErr, data){
//     var age = parseInt(process.argv[4]);
//     var kind = process.argv[5];
//     var name = process.argv[6];
//
//     if (readErr) {
//       throw readErr;
//     }
//     var pets = JSON.parse(data);
//     var newPet = {age: age, kind: kind, name: name};
//
//     if (!age || !kind || !name) {
//       console.error('Usage: ${node} ${file} ${cmd} PET');
//       process.exit(1);
//     }
//     pets.push(newPet);
//
//     var petsJSON = JSON.stringify(pets);
//
//     fs.writeFile(petsPath, petsJSON, function(writeErr){
//       if (writeErr) {
//         throw writeErr;
//       }
//       console.log(pets);
//     });
//   });
} else {
  console.error('Usage: ${node} ${file} [read | create | update | destroy]');
  process.exit(1);
}
