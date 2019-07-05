
let arc = require('@architect/functions');
let static = assetPath => `/_static/${assetPath}`;
let getURL = require('./get-web-socket-url');

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
<script type=module src=${static('index.mjs')}></script>
</body>
</html>`
  };
};
