import { render } from '@testing-library/svelte'
import GoogleAuth from './GoogleAuth.svelte'
import type { GoogleProfile } from './GoogleTypes'
import jsonLoader from './JsonLoader'

describe('GoogleAuth', () => {
  const user: GoogleProfile | undefined = { id: 1, email: 'm', verified_email: true, name: 'm', given_name: 'm', family_name: 't', picture: 'h', locale: 'en' }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it.skip('does not render button if user not found', async () => {
    vi.spyOn(jsonLoader, 'loadJson').mockResolvedValue(undefined)
    render(GoogleAuth, { user: undefined })
    expect(jsonLoader.loadJson).toHaveBeenCalled()
    expect(document.querySelector('.logout')).not.toBeInTheDocument()
  })

  it.skip('renders button if a user is found', async () => {
    vi.spyOn(jsonLoader, 'loadJson').mockResolvedValue(user)
    render(GoogleAuth, { user: undefined })
    expect(jsonLoader.loadJson).toHaveBeenCalled()
    expect(document.querySelector('.logout')).toBeInTheDocument()
  })
})
