import express, {Request, Response} from 'express'
import request from 'request'
import * as dotenv from 'dotenv'
import {GOOGLE_OAUTH_PROFILE_URL, GOOGLE_OAUTH_SCOPE, GOOGLE_OAUTH_TOKEN_URL, GOOGLE_OAUTH_URL,} from './config'

dotenv.config({ path: __dirname+'/auth.env' })

const port = process.env.PORT ?? 8999

const app = express()

const googleAuth = {
  authUrl: GOOGLE_OAUTH_URL,
  tokenUrl: GOOGLE_OAUTH_TOKEN_URL,
  profileUrl: GOOGLE_OAUTH_PROFILE_URL,
  scope: GOOGLE_OAUTH_SCOPE,
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}

interface GoogleProfile {
  id: number,
  email: string,
  verified_email: boolean,
  name: string,
  given_name: string,
  family_name: string,
  picture: string,
  locale: string
}

app.get('/', async function (req: Request, res: Response) {
  const provider = googleAuth

  if (provider.clientId && provider.clientSecret) {
    // TODO check if user exists with cookies
    res.redirect(provider.authUrl + `?client_id=${provider.clientId}&scope=${provider.scope}&redirect_uri=${redirectUrl(req)}&response_type=code`)
  } else {
    res.sendFile(__dirname, '/../build/index.html')
  }
})

function redirectUrl(req: Request) {
  const ownHost = req.header('Host')
  return (ownHost!.includes('localhost') ? 'http://' : 'https://') + ownHost + '/auth'
}

app.get('/auth', async function (req: Request, res: Response) {
  const token = await fetchToken(googleAuth, req.query.code as string, redirectUrl(req))
  const profile = await fetchProfile(googleAuth, token)
  // TODO: remember email/name/etc
})

app.get('/logout', function (req, res) {
  res.cookie('AUTH', '')
  res.redirect('/')
})

function fetchToken(provider: typeof googleAuth, code: string, redirectUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    request.post(provider.tokenUrl + `?grant_type=authorization_code&code=${code}&redirect_uri=` + redirectUrl +
      `&client_id=${provider.clientId}&client_secret=${provider.clientSecret}`,(err, res) => {
      if (err) reject(err)
      else resolve(JSON.parse(res.body).access_token)
    })
  })
}

function fetchProfile(provider: typeof googleAuth, token: string): Promise<GoogleProfile> {
  return new Promise((resolve, reject) => {
    request(provider.profileUrl, {headers: {'Authorization': 'Bearer ' + token}},(err, res) => {
      console.log(res.body)
      if (err) reject(err)
      else resolve(JSON.parse(res.body))
    })
  })
}

app.get('/proxy/**', (req, res) => {
  const url = req.url.slice(7, req.url.length)
  request(url).pipe(res)
})

app.use(express.static('build'))

app.listen(port, () => console.log(`Listening on port: ${port}`))
