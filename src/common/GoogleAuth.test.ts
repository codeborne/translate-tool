import {act, render} from '@testing-library/svelte'
import {expect} from 'chai'
import GoogleAuth from './GoogleAuth.svelte'
import type {GoogleAuthUser} from './GoogleAuthUser'
import {stub} from 'sinon'

describe('GoogleAuth', () => {
  const user: GoogleAuthUser = undefined
  const authFile = {google: { client_id: "google_auth_client_id"}}

  beforeEach(() => {
    // @ts-ignore
    window['gapi'] = {
      load() {
        return null;
      }
    }
  })

  it('renders nothing if auth file contains no client id', async () => {
    const {container} = render(GoogleAuth, {user})
    stub(window, 'fetch').resolves(undefined)
    await act(() => Promise.resolve())
    expect(container.querySelector('.login')).to.not.exist
    expect(container.querySelector('.logout')).to.not.exist
  })

  it.skip('renders login/logout buttons if auth file has client id', async () => {
    stub(window, 'fetch').resolves({json: async () => authFile} as Response)
    const {container} = render(GoogleAuth, {user})
    await act(() => Promise.resolve())
    expect(fetch).called
    expect(container.querySelector('.login')).to.exist
    expect(container.querySelector('.logout')).to.not.exist
  })
})
