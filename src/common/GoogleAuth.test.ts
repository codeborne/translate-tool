import {act, render} from '@testing-library/svelte'
import {expect} from 'chai'
import GoogleAuth from './GoogleAuth.svelte'
import {stub} from 'sinon'
import jsonLoader from './JsonLoader'
import type {GoogleProfile} from './GoogleTypes'

describe('GoogleAuth', () => {
  let user: GoogleProfile|undefined = {id:1,email:'m',verified_email:true,name:'m',given_name:'m',family_name:'t',picture:'h',locale:'en'}

  it('does not render button if not found', async () => {
    stub(jsonLoader, 'loadJson').resolves(undefined)
    const {container} = render(GoogleAuth, {user})
    expect(jsonLoader.loadJson).called
    await act(jsonLoader.loadJson)
    expect(container.querySelector('.logout')).to.not.exist
  })

  it.skip('renders button if a user is found', async () => {
    stub(jsonLoader, 'loadJson').resolves()
    const {container} = render(GoogleAuth, {user})
    expect(jsonLoader.loadJson).called
    await act(jsonLoader.loadJson)
    expect(container.querySelector('.logout')).to.not.exist
  })
})
