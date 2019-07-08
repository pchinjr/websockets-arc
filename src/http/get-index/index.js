let arc = require('@architect/functions');
exports.handler = arc.proxy.public({spa: true});
console.log('get index handler')
