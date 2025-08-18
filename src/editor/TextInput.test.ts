import { fireEvent, render } from '@testing-library/svelte'
import TextInput from './TextInput.svelte'
import type { Dict } from '../common/Project'

describe('TextInput', () => {
  const dict: Dict = { something: 'no html', somethingHtml: 'html', b: { c: 'c' } }
  let key = 'somethingHtml'
  let fullKey = 'someKey.' + key
  const isFirefox = false

  it('renders element with contenteditable if given key that ends with Html and editing works', async () => {
    const { container } = render(TextInput, { uneditedDict: dict, isFirefox, dict, key, fullKey })
    const element = container.querySelector('[contenteditable]')
    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('html')
    expect(container.querySelector('.btn')).toBeInTheDocument()
    element.textContent = 'edited'
    expect(element.textContent).toContain('edited')
  })

  it('Clicking on html button renders the HTML preview', async () => {
    const { container } = render(TextInput, { uneditedDict: dict, dict, isFirefox, key, fullKey })
    const button: HTMLButtonElement | null = container.querySelector('.btn')
    expect(button).toBeInTheDocument()
    expect(container.querySelector('.preview')).not.toBeInTheDocument()
    await fireEvent.click(button)
    expect(container.querySelector('.preview')).toBeInTheDocument()
  })

  it('renders element with contenteditable if any of the keys ends with Html', async () => {
    key = 'something'
    fullKey = 'someKeyHtml.' + key
    const { container } = render(TextInput, { uneditedDict: dict, dict, isFirefox, key, fullKey })
    const element = container.querySelector('[contenteditable]')
    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('no html')
    expect(container.querySelector('.btn')).toBeInTheDocument()
  })

  it('renders textarea if key does not end with Html', async () => {
    key = 'something'
    fullKey = 'someKey.' + key
    const { container } = render(TextInput, { uneditedDict: dict, dict, key, isFirefox, fullKey })
    const element = container.querySelector('.not-html')
    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('no html')
    element.textContent = 'edited'
    expect(element.textContent).toContain('edited')
    expect(container.querySelector('.btn')).not.toBeInTheDocument()
  })

  it('uses contenteditable=plaintext-only when using browsers other than firefox', async () => {
    const { container } = render(TextInput, { uneditedDict: dict, dict, key, isFirefox, fullKey })
    const plaintextElement = container.querySelector('[contenteditable="plaintext-only"]')
    expect(plaintextElement).toBeInTheDocument()
  })

  it('uses contenteditable=true when using firefox', async () => {
    const { container } = render(TextInput, { uneditedDict: dict, dict, key, isFirefox: true, fullKey })
    const element = container.querySelector('[contenteditable="true"]')
    expect(element).toBeInTheDocument()
  })
})
