
var m1 = require('./modules/m1.js');
var m2 = require('./modules/m2.js');
var m3 = require('./modules/m3.js');

console.log(m1.foo(), m2(), m3.foo());
// module.exports.foo(),module.exports(),exports.foo();
var unique = require('uniq');

var data = [1, 7, 2, 3, 4, 5, 5, 5, 6];

console.log(unique(data));