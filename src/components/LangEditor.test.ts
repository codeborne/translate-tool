import {act, render} from '@testing-library/svelte'
import {expect} from 'chai'
import LangEditor from './LangEditor.svelte'
import {stub} from 'sinon'

describe('<LangEditor>', () => {
  const dict = {hello: 'world', nested: {hello: 'Another World'}}

  it('renders', () => {
    const {getByText} = render(LangEditor, {lang: 'en'})
    const e = getByText(/Currently editing/i)
    expect(document.body.contains(e))
  })

  it('renders fetched dictionary data correctly', async () => {
    stub(window, 'fetch').resolves({json: () => Promise.resolve(dict)} as Response)
    const {getByText, container} = render(LangEditor, {lang: 'et'})
    expect(fetch).calledWith('/i18n/en.json')
    expect(fetch).calledWith('/i18n/et.json')
    await act(fetch)
    await act(fetch)
    expect(container.querySelectorAll('tbody tr'))
      .to.have.length(2, 'correct amount of table rows')
    expect(container.querySelector('#rawOutput'))
      .property('value')
      .contains(JSON.stringify(dict, null, 2), 'correct raw output')
    expect(container.querySelector('h5')!.textContent).to.contain('Currently editing: et')
    expect(container.querySelector('h6')!.textContent).to.contain('Total text: 2')
  })
})