import sM from './sM'
import {getCode, isSupported} from './languages'

interface TranslateOptions {
  from?: string,
  to?: string
  hl?: string
  raw?: boolean
  tld?: string
}

interface Token {
  name: string
  value: string
}

class Translator {
  CORSService = ''
  
  private token(text: string) {
    return new Promise<Token>(resolve => {
      resolve({ name: 'tk', value: sM(text) })
    })
  }

  public setCORS(CORSURL: string) {
    this.CORSService = CORSURL
    return this.translate
  }

  public translate(
    text: string,
    opts_: TranslateOptions = {}
  ): Promise<string> {
    const opts: TranslateOptions = {
      from: opts_.from || 'auto',
      to: opts_.to || 'en',
      hl: opts_.hl || 'en',
      raw: opts_.raw || false,
      tld: opts_.tld || 'com'
    }

    let e: Error|undefined
    [opts.from, opts.to].forEach(lang => {
      if (lang && !isSupported(lang)) {
        e = new Error()
        e.message = `The language '${lang}' is not supported`
      }
    })

    if (e) {
      return new Promise((resolve, reject) => {
        reject(e)
      })
    }

    return this.token(text)
      .then((token: Token) => {
        const url = 'https://translate.google.' + opts.tld + '/translate_a/single'
        const data = {
          client: 'gtx',
          sl: getCode(opts?.from),
          tl: getCode(opts?.to),
          hl: getCode(opts?.hl),
          ie: 'UTF-8',
          oe: 'UTF-8',
          otf: 1,
          ssel: 0,
          tsel: 0,
          kc: 7,
          q: text,
          [token.name]: token.value
        }

        let stringifiedData = new URLSearchParams(data as Record<string, any>).toString()
        let position: number = stringifiedData.indexOf('hl=') + 6
        let encoded = [stringifiedData.slice(0, position), 'dt=at&bd=ex&ld=md&qca=rw&rm=ss&t', stringifiedData.slice(position)].join('')
        return url + '?' + encoded
      })
      .then(url => fetch(this.CORSService + url)
          .then(response => response.json())
          .then(result => result[5][0][2][0][0])
          .catch(err => {
            const e: Error = new Error()
            if (err.statusCode && err.statusCode !== 200) e.message = 'BAD_REQUEST'
            else e.message = 'BAD_NETWORK'
            throw e
          }))
  }
}

export default new Translator()
