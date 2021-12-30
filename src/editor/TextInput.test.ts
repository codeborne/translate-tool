import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import TextInput from './TextInput.svelte'

describe('TextInput', () => {
  it('renders editable div if given key that ends with Html', async () => {
    const {container} = render(TextInput)
    expect(container.textContent).to.contain('TODO')
  })

  it('renders textarea if key does not end with Html', async () => {
    const {container} = render(TextInput)
    expect(container.textContent).to.contain('TODO')
  })
})
