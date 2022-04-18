import express, {Request, Response} from 'express'
import request from 'request'
import cookieParser from 'cookie-parser'
import config from './config'
import {hasProjectsFile} from './FileChecker'
import logger from './Logger'

const cookieSecret: string = process.env.COOKIE_SECRET ?? 'YourCookieValueHereToDetectTampering'
const port = process.env.PORT ?? 8999
const app = express()
app.use(cookieParser(cookieSecret))

const googleAuth = {
  authUrl: config.GOOGLE_OAUTH_URL,
  tokenUrl: config.GOOGLE_OAUTH_TOKEN_URL,
  profileUrl: config.GOOGLE_OAUTH_PROFILE_URL,
  scope: config.GOOGLE_OAUTH_SCOPE,
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}
const allowAll = !config.ALLOWED_EMAILS.length && !config.ALLOWED_DOMAINS.length

const canLogin = (profile: GoogleProfile) => isEmailVerified(profile.email) || isDomainVerified(profile.email)

const isSecure = googleAuth.clientId && googleAuth.clientSecret

app.get('/health', async function (req, res) {
  return res.sendStatus(204)
})

app.get('/auth', async function (req: Request, res: Response) {
  const token: string = await fetchToken(googleAuth, req.query.code as string, redirectUrl(req))
  const profile: GoogleProfile = await fetchProfile(googleAuth, token)
  if (canLogin(profile)) {
    res.cookie('AUTH', {token, name: profile.name, email: profile.email}, {signed: true, httpOnly: true})
    res.redirect('/')
  } else res.sendStatus(403)
})

app.get('/user', async function (req, res) {
  if (!req.signedCookies['AUTH'] || !isSecure) return res.sendStatus(404)
  const user: UserInfoResponse = {name: req.signedCookies['AUTH'].name, email: req.signedCookies['AUTH'].email}
  logger.log(`${user.email} has logged in`)
  res.json(user)
})

app.get('/logout', function (req, res) {
  res.clearCookie('AUTH')
  res.redirect('/')
})

app.get('/proxy/**', (req, res) => {
  const url: string = req.url.slice(7, req.url.length)
  request(url).pipe(res)
})

app.get('/*', async function (req: Request, res: Response) {
  const provider: typeof googleAuth = googleAuth
  if (isSecure && !req.signedCookies['AUTH'])
    res.redirect(provider.authUrl + `?client_id=${provider.clientId}&scope=${provider.scope}` +
      `&redirect_uri=${redirectUrl(req)}&response_type=code&prompt=select_account`)
  else res.sendFile(__dirname, '/../build/index.html')
})

function isEmailVerified(email: string): boolean {
  if (allowAll) return true
  return !!(config.ALLOWED_EMAILS as string[]).includes(email)
}

function isDomainVerified(email: string): boolean {
  if (allowAll) return true
  const domain: string = email.split('@').pop() as string
  return !!(config.ALLOWED_DOMAINS as string[]).includes(domain)
}

function redirectUrl(req: Request) {
  const ownHost: string = req.header('Host') as string
  return (ownHost.includes('localhost') ? 'http://' : 'https://') + ownHost + '/auth'
}

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
      if (err) reject(err)
      else resolve(JSON.parse(res.body) as GoogleProfile)
    })
  })
}

function initVerbose() {
  logger.log(`Listening on port: ${port}`)

  if (!isSecure) {
    logger.info('Running without authentication')
    logger.info('Set up GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables if you wish to protect your app.')

    if (hasProjectsFile()) {
      logger.error('Default project exists, but no authentication to protect it present')
      logger.error('Aborting...')
      process.exit()
    }
  }
}

app.use(express.static('build'))

app.listen(port, () => {
  initVerbose()
})

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

interface UserInfoResponse {
  name: string,
  email: string
}