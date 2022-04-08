import {fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import Accordion from './Accordion.svelte'

describe('Accordion', () => {

  const message = 'Should display'
  const className = 'accordionClass'

  it('contains the right class name within class', async () => {
    const {container} = render(Accordion, {message, className})
    expect(container.querySelector('.accordionClass')).to.exist
  })

  it('displays the accordion header', async () => {
    const {container} = render(Accordion, {message, className})
    expect(container.querySelector('.accordion-button')).to.exist
    expect(container.querySelector('.accordion-button')!.textContent).to.contain('Should display')
  })

  it('is closed by default', async () => {
    const {container} = render(Accordion, {message, className})
    expect(container.querySelector('.accordion-content')).to.not.exist
    expect(container.querySelector('button.collapsed')).to.exist
  })

  it('shows content when open', async () => {
    const {container} = render(Accordion, {message, className, isOpen: true})
    expect(container.querySelector('.accordion-content')).to.exist
    expect(container.querySelector('button.collapsed')).to.not.exist
  })

  it('fires toggle event with class name on click', async () => {
    const {container, component} = render(Accordion, {message, className})
    expect(container.querySelector('.accordion-content')).to.not.exist
    const accordion = container.querySelector('.accordion-button')!
    let result
    component.$on('toggle', e => {
      result = e.detail
    })
    await fireEvent.click(accordion)
    expect(result).to.equal('accordionClass')

  })
})
