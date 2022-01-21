import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import DefaultLangValue from './DefaultLangValue.svelte'

describe('DefaultLangValue', () => {

  const fullKey = 'this.is.a.test'
  const key = 'test'
  const dict = {test: 'value'}

  it.skip('renders', async () => {
    const {container} = render(DefaultLangValue, {fullKey, key, dict})
    expect(container.textContent).to.contain('TODO')
  })
})
