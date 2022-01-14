const host = 'localhost';
const port = 8998;

const cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
  originWhitelist: [],
  requireHeader: [],
  removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
  console.log('Listening on ' + host + ':' + port);
});