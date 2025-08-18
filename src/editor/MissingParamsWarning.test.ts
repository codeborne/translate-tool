import { render } from '@testing-library/svelte'
import MissingParamsWarning from './MissingParamsWarning.svelte'

describe('MissingParamsWarning', () => {
  const defaultDict = { key: 'String has a link: {url} and maybe some {number} and heh, some {value}' }
  const key = 'key'
  let dict = { key: 'No values' }

  it('shows warning if all placeholders missing', async () => {
    const { container } = render(MissingParamsWarning, { defaultDict, key, dict })
    expect(container.querySelector('.text-small').textContent).toContain('Missing placeholders: {url}, {number}, {value}')
  })

  it('shows warning if one placeholder is missing', async () => {
    dict = { key: '{url}, {number} and an unclosed {value' }
    const { container } = render(MissingParamsWarning, { defaultDict, key, dict })
    expect(container.querySelector('.text-small').textContent).toContain('Missing placeholders: {value}')
  })

  it('shows nothing if all placeholders present', async () => {
    dict = { key: '{url}, {number} and {value}' }
    const { container } = render(MissingParamsWarning, { defaultDict, key, dict })
    expect(container.querySelector('.text-small')).not.toBeInTheDocument()
  })

  it('shows nothing if placeholders missing, but input has no text', async () => {
    dict = { key: '' }
    const { container } = render(MissingParamsWarning, { defaultDict, key, dict })
    expect(container.querySelector('.text-small')).not.toBeInTheDocument()
  })
})
