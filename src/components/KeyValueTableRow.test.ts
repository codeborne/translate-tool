import {act, render} from '@testing-library/svelte'
import {expect} from 'chai'
import LangEditor from './LangEditor.svelte'
import {stub} from 'sinon'
import KeyValueTableRow from './KeyValueTableRow.svelte'

const dict: Record<string, any> = {
  world: 'hello',
  hello: 'world',
  nested: {
    another: 'worlddd',
    ping: 'pong',
    more_nested: {
      foo: 'bar'
    }
  }
}
const defaultDict: Record<string, any> = dict

describe('<KeyValueTableRow>', () => {
  it('renders all inputs', () => {
    const {container} = render(KeyValueTableRow, {dict, defaultDict})
    expect(container.querySelectorAll('input')).to.have.length(5)
  })
})