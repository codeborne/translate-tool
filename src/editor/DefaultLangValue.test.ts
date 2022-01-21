import {fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import DefaultLangValue from './DefaultLangValue.svelte'

describe('DefaultLangValue', () => {

  let fullKey = 'this.isHtml.a.test'
  let defaultDict = {test: '<p>value</p>'}
  const key = 'test'


  it('renders the text styled and shows HTML preview button', async () => {
    const {container} = render(DefaultLangValue, {fullKey, key, defaultDict})
    expect(container.querySelector('.toggleShowHtmlBtn')).to.exist
    expect(container.querySelector('.defaultLangText')).to.exist
    expect(container.querySelector('.defaultLangText')!.textContent).to.equal('value')
  })

  it('can switch between HTML and styled text', async () => {
    const {container} = render(DefaultLangValue, {fullKey, key, defaultDict})
    expect(container.querySelector('.defaultLangText')!.textContent).to.equal('value')
    await fireEvent.click(container.querySelector('.toggleShowHtmlBtn') as HTMLButtonElement)
    expect(container.querySelector('.defaultLangText')!.textContent).to.equal('<p>value</p>')
    await fireEvent.click(container.querySelector('.toggleShowHtmlBtn') as HTMLButtonElement)
    expect(container.querySelector('.defaultLangText')!.textContent).to.equal('value')
  })

  it('does not render HTML preview button if not an HTML key', async () => {
    let fullKey = 'this.is.a.test'
    let defaultDict = {test: 'value'}
    const {container} = render(DefaultLangValue, {fullKey, key, defaultDict})
    expect(container.querySelector('.toggleShowHtmlBtn')).to.not.exist
    expect(container.querySelector('.defaultLangText')).to.exist
    expect(container.querySelector('.defaultLangText')!.textContent).to.equal('value')
  })
})
