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
    const rows = container.querySelectorAll('tr')
    const firstRow = rows[0].querySelectorAll('td')
    const lastRow = rows[rows.length - 1].querySelectorAll('td')

    // first row
    expect(firstRow).to.have.length(3)
    expect(firstRow[0].textContent).to.contain('world')
    expect(firstRow[1].querySelector('input')!.value).to.contain('hello')
    expect(firstRow[2].textContent).to.contain('hello')

    // last row
    expect(lastRow).to.have.length(3)
    expect(lastRow[0].textContent).to.contain('nested.more_nested.foo')
    expect(lastRow[1].querySelector('input')!.value).to.contain('bar')
    expect(lastRow[2].textContent).to.contain('bar')
  })
})