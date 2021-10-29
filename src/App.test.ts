import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import App from './App.svelte'

describe('<App>', () => {
  it('renders', () => {
    const {getByText} = render(App)
    const e = getByText(/Translate/i)
    expect(document.body.contains(e))
  })
})
