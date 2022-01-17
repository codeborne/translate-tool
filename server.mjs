import express from 'express'
import request from 'request'

const port = process.env.PORT ?? 8998
const domain = process.env.DOMAIN ?? 'localhost'

const app = express()

app.get('/proxy', (req, res) => {
  const url = req.url.slice(1, req.url.length)
  res.header("Access-Control-Allow-Origin", "*");
  request(url).pipe(res)
})

app.use(express.static('build'))

app.listen(port, () => console.log(`Listening on http://${domain}:${port}`))
