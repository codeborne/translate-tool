import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import KeyValueTableRow from './KeyValueTableRow.svelte'
import type {Dict} from '../common/Project'
import Filter from './Filter'

describe('<KeyValueTableRow>', () => {
  const dict: Dict = {
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

  const lang = 'en'
  const filter = new Filter()
  const defaultDict: Dict = dict
  const uneditedDict: Dict = dict

  it('renders all inputs', () => {
    const {container} = render(KeyValueTableRow, {dict, defaultDict, uneditedDict, filter, lang})
    expect(container.querySelectorAll('textarea')).to.have.length(5)
    const rows = container.querySelectorAll('tr')
    const firstRow = rows[0].querySelectorAll('td')
    const lastRow = rows[rows.length - 1].querySelectorAll('td')

    // first row
    expect(firstRow).to.have.length(3)
    expect(firstRow[0].textContent).to.contain('world')
    expect(firstRow[1].querySelector('textarea')!.value).to.contain('hello')
    expect(firstRow[2].textContent).to.contain('hello')

    // last row
    expect(lastRow).to.have.length(3)
    expect(lastRow[0].textContent).to.contain('nested.more_nested.foo')
    expect(lastRow[1].querySelector('textarea')!.value).to.contain('bar')
    expect(lastRow[2].textContent).to.contain('bar')
  })

  it('shows only filtered inputs', () => {
    filter.search = 'nested'
    const {container} = render(KeyValueTableRow, {dict, defaultDict, uneditedDict, filter, lang})
    const inputs = container.querySelectorAll('textarea')
    expect(inputs).to.have.length(3)
    expect(inputs[0].value).to.contain('worlddd')
    expect(container.textContent).to.not.contain('hello')
  })
})
