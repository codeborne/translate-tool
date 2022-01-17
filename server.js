const express = require('express'),
  app = express()
const request = require('request')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/**', (req, res) => {
  const url = req.url.slice(1, req.url.length)
  request(url).pipe(res)
})
app.listen(8998, () => console.log(`Listening on http://localhost:8998`));