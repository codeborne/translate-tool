import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import Navbar from './Navbar.svelte'

describe('Navbar', () => {
  it('renders title', async () => {
    const {container} = render(Navbar)
    expect(container.querySelector('.nav-logo')).to.exist
  })
})
