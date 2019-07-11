const arc = require('@architect/functions');
// creates proxy for static files at root'
exports.handler = arc.proxy.public();
