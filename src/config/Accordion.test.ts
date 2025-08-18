import { fireEvent, render } from '@testing-library/svelte';
import Accordion from './Accordion.svelte';

describe('Accordion', () => {
  const heading = 'Should display';
  const className = 'accordionClass';

  it('contains the right class name within class', async () => {
    const { container } = render(Accordion, { heading, className });
    expect(container.querySelector('.accordionClass')).toBeInTheDocument();
  });

  it('displays the accordion header', async () => {
    const { container } = render(Accordion, { heading, className });
    expect(container.querySelector('.accordion-button')).toBeInTheDocument();
    expect(container.querySelector('.accordion-button').textContent).toContain('Should display');
  });

  it('is closed by default', async () => {
    const { container } = render(Accordion, { heading, className });
    expect(container.querySelector('.accordion-content')).not.toBeInTheDocument();
    expect(container.querySelector('button.collapsed')).toBeInTheDocument();
  });

  it('shows content when open', async () => {
    const { container } = render(Accordion, { heading, className, isOpen: true });
    expect(container.querySelector('.accordion-content')).toBeInTheDocument();
    expect(container.querySelector('button.collapsed')).not.toBeInTheDocument();
  });

  it('fires toggle event with class name on click', async () => {
    const { container, component } = render(Accordion, { heading, className });
    expect(container.querySelector('.accordion-content')).not.toBeInTheDocument();
    const accordion = container.querySelector('.accordion-button');
    let result;
    component.$on('toggle', (e) => {
      result = e.detail;
    });
    await fireEvent.click(accordion);
    expect(result).toEqual('accordionClass');
  });
});
