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
        foo: 'bar',
        bar: 'foo'
      }
    }
  }

  let excludedKeys: Set<string> = new Set([])
  let lang = 'en'
  const defaultLang: string = 'en'
  const filter = new Filter()
  const defaultDict: Dict = dict
  const uneditedDict: Dict = dict
  const isFirefox = false

  it('renders all inputs', () => {
    const {container} = render(KeyValueTableRow, {defaultLang, isFirefox, dict, defaultDict, uneditedDict, filter, lang, excludedKeys})
    const rows = container.querySelectorAll('tr')
    const firstRow = rows[0].querySelectorAll('td')
    const lastRow = rows[rows.length - 1].querySelectorAll('td')
    expect(firstRow).to.have.length(3)
    expect(firstRow[0].textContent).to.contain('world')
    expect(firstRow[2].textContent).to.contain('hello')
    expect(lastRow).to.have.length(3)
    expect(lastRow[0].textContent).to.contain('nested.more_nested.bar')
    expect(lastRow[2].textContent).to.contain('foo')
  })

  it('shows only filtered inputs', () => {
    filter.search = 'nested'
    const {container} = render(KeyValueTableRow, {defaultLang, isFirefox, dict, defaultDict, uneditedDict, filter, lang, excludedKeys})
    const inputs = container.querySelectorAll('.not-html')
    expect(inputs).to.have.length(4)
    expect(inputs[0].textContent).to.contain('worlddd')
    expect(container.textContent).to.not.contain('hello')
  })

  it('does not contain individual keys that are not supposed to be translated', () => {
    filter.search = ''
    lang = 'de'
    excludedKeys = new Set(['nested.ping'])
    const {container} = render(KeyValueTableRow, {defaultLang, dict, isFirefox, defaultDict, uneditedDict, filter, lang, excludedKeys})
    const inputs = container.querySelectorAll('.not-html')
    expect(inputs).to.have.length(5)
    expect(container.textContent).to.not.contain('nested.ping')
    expect(container.textContent).to.not.contain('pong')
    expect(container.textContent).to.contain('nested.another')
  })

  it('does not contain objects that are not supposed to be translated', () => {
    filter.search = ''
    lang = 'de'
    excludedKeys = new Set(['nested.more_nested'])
    const {container} = render(KeyValueTableRow, {defaultLang, dict, defaultDict, isFirefox, uneditedDict, filter, lang, excludedKeys})
    const inputs = container.querySelectorAll('.not-html')
    expect(inputs).to.have.length(4)
    expect(container.textContent).to.not.contain('nested.more_nested.foo')
    expect(container.textContent).to.not.contain('nested.more_nested.bar')
    expect(container.textContent).to.contain('nested.another')
  })

  it('shows label if cannot be translated but default lang is selected', () => {

    const untranslatableLabel = 'Marked as untranslatable'
    filter.search = ''
    lang = 'en'
    excludedKeys = new Set(['nested.more_nested', 'nested.another'])
    const {container} = render(KeyValueTableRow, {defaultLang, dict, defaultDict, isFirefox, uneditedDict, filter, lang, excludedKeys})
    const rows = container.querySelectorAll('tr')
    expect(rows).to.have.length(6)
    expect(rows[0].querySelectorAll('td')[0].textContent).to.not.contain(untranslatableLabel)
    expect(rows[1].querySelectorAll('td')[0].textContent).to.not.contain(untranslatableLabel)
    expect(rows[2].querySelectorAll('td')[0].textContent).to.contain(untranslatableLabel)
    expect(rows[3].querySelectorAll('td')[0].textContent).to.not.contain(untranslatableLabel)
    expect(rows[4].querySelectorAll('td')[0].textContent).to.contain(untranslatableLabel)
    expect(rows[5].querySelectorAll('td')[0].textContent).to.contain(untranslatableLabel)
  })
})
