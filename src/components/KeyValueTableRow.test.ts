import {getByText, render} from '@testing-library/svelte'
import {expect} from 'chai'
import KeyValueTableRow from './KeyValueTableRow.svelte'

const selectedDict: Record<string, any> = {
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

const uneditedDict: Record<string, any> = selectedDict
const defaultDict: Record<string, any> = selectedDict
let filter: string = ''

describe('<KeyValueTableRow>', () => {
  it('renders all inputs', () => {
    const {container} = render(KeyValueTableRow, {selectedDict, defaultDict, uneditedDict, filter})
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

  it('shows only filtered inputs', () => {
    filter = 'nested'
    const {container, getByText} = render(KeyValueTableRow, {selectedDict, defaultDict, uneditedDict, filter})
    const inputs = container.querySelectorAll('input')
    expect(inputs).to.have.length(3)
    expect(inputs[0].value).to.contain('worlddd')

    // expect(document.body.contains(getByText(/hello/i)))
    expect(container.textContent).to.not.contain('hello')
  })
})