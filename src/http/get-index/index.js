
// let arc = require('@architect/functions');
// let getURL = require('./get-web-socket-url');
// let static = assetPath => `${process.env.NODE_ENV}/_static/${assetPath}`;


// exports.handler = async function http(request) {
//   return {
//     status: 201,
//     type: 'text/html; charset=utf8',
//     body: `
//       <!doctype html>
//       <html>
//         <body>hello world</body>
//         <script>console.log('hello world')</script>
//       </html>
//     `
//   };
// };

let arc = require('@architect/functions');

exports.handler = arc.proxy.public({spa: true});
