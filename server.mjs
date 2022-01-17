import express from 'express'
import request from 'request'

const port = process.env.PORT ?? 8999

const app = express()

app.get('/proxy/**', (req, res) => {
  const url = req.url.slice(7, req.url.length)
  request(url).pipe(res)
})

app.use(express.static('build'))

app.listen(port, () => console.log(`Listening on port: ${port}`))
