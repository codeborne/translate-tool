import {act, render} from '@testing-library/svelte'
import {expect} from 'chai'
import GoogleAuth from './GoogleAuth.svelte'
import type {GoogleAuthUser} from './GoogleAuthUser'
import {stub} from 'sinon'
import jsonLoader from './JsonLoader'

describe('GoogleAuth', () => {
  const user: GoogleAuthUser = undefined

  it.skip('renders if a user is found', async () => {
    stub(jsonLoader, 'loadJson').resolves(undefined)
    const {container} = render(GoogleAuth, {user})
    expect(jsonLoader.loadJson).called
    await act(jsonLoader.loadJson)
    expect(container.querySelector('.logout')).to.not.exist
  })
})
