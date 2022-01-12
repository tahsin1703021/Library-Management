const peter = 'peter';
const john = 'john';

// module.exports = { john, peter, r: 'mama'}
const _ = require('lodash');
const people = require('./practice1');
console.log(people);
console.log(_.last(people));