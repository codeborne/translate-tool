import {act, render} from '@testing-library/svelte'
import {expect} from 'chai'
import Stats from './Stats.svelte'
import {stub} from 'sinon'

describe('<Stats>', () => {
  const dict = {hello: 'world', nested: {hello: 'Another World'}}

  const indent: number = 2
  const defaultLang: string = 'et'
  const totalLangs: number = 8
  const stats = {total: 9, filled: 4}

  it('renders', () => {
    const {getByText, container} = render(Stats, {stats, indent, defaultLang, totalLangs})
    const e = getByText(/Stats/i)
    expect(document.body.contains(e))
    expect(container.querySelectorAll('tbody tr'))
      .to.have.length(6, 'correct amount of table rows')
  })

  it('renders component with correct data', async () => {
    const {container} = render(Stats, {stats, indent, defaultLang, totalLangs})
    const rows = container.querySelectorAll('tr')
    expect(rows[0].querySelectorAll('td')[1].textContent).to.equal('9')
    expect(rows[1].querySelectorAll('td')[1].textContent).to.equal('4')
    expect(rows[2].querySelectorAll('td')[1].textContent).to.equal('5')
    expect(rows[3].querySelectorAll('td')[1].textContent).to.equal('et')
    expect(rows[4].querySelectorAll('td')[1].textContent).to.equal('8')
    expect(rows[5].querySelectorAll('td')[1].textContent).to.equal('2')
  })
})