import {act, render} from '@testing-library/svelte'
import {expect} from 'chai'
import GoogleAuth from './GoogleAuth.svelte'
import type {GoogleAuthUser} from './GoogleAuthUser'
import {stub} from 'sinon'
import jsonLoader from './JsonLoader'

describe('GoogleAuth', () => {
  const user: GoogleAuthUser = undefined
  const authFile = {google: { client_id: "google_auth_client_id"}}

  beforeEach(() => {
    // @ts-ignore
    window['gapi'] = {
      load() {
        return null
      },
    }
  })

  it('renders nothing if auth file contains no client id', async () => {
    stub(jsonLoader, 'loadJson').resolves(undefined)
    const {container} = render(GoogleAuth, {user})
    expect(jsonLoader.loadJson).called
    await act(jsonLoader.loadJson)
    expect(container.querySelector('.login')).to.not.exist
    expect(container.querySelector('.logout')).to.not.exist
  })

  it.skip('renders login/logout buttons if auth file has client id', async () => {
    stub(jsonLoader, 'loadJson').resolves({json: async () => authFile} as Response)
    const {container} = render(GoogleAuth, {user})
    expect(jsonLoader.loadJson).calledWith('auth.json')
    await act(jsonLoader.loadJson)
    expect(container.querySelector('.login')).to.exist
    expect(container.querySelector('.logout')).to.not.exist
  })
})
