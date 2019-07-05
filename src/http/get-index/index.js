
let arc = require('@architect/functions');
let getURL = require('./get-web-socket-url');
let static = assetPath => `${process.env.NODE_ENV}/_static/${assetPath}`;


exports.handler = async function http(req) {
  return {
    headers: {'content-type': 'text/html; charset=utf8'},
    body: `<!doctype html>
<html>
<body>
<h1> Web Sockets </h1>
<main> Loading ... </main>
<input id=message type=text placeholder="Enter message" autofocus>
<script>
window.WS_URL = '${getURL()}'
</script>
<script type=module src="/_static/index.mjs"></script>
<script type=module src=${static('index.mjs')}></script>
</body>
</html>`
  };
};
