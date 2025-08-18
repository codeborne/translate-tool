import { fireEvent, render } from '@testing-library/svelte';
import DefaultLangValue from './DefaultLangValue.svelte';

describe('DefaultLangValue', () => {
  const fullKey = 'this.isHtml.a.test';
  const defaultDict = { test: '<p>value</p>' };
  const key = 'test';

  it('renders the text styled and shows HTML preview button', async () => {
    const { container } = render(DefaultLangValue, { fullKey, key, defaultDict });
    expect(container.querySelector('.toggleShowHtmlBtn')).toBeInTheDocument();
    expect(container.querySelector('.defaultLangText')).toBeInTheDocument();
    expect(container.querySelector('.defaultLangText').textContent).toEqual('value');
  });

  it('can switch between HTML and styled text', async () => {
    const { container } = render(DefaultLangValue, { fullKey, key, defaultDict });
    expect(container.querySelector('.defaultLangText').textContent).toEqual('value');
    await fireEvent.click(container.querySelector('.toggleShowHtmlBtn') as HTMLButtonElement);
    expect(container.querySelector('.defaultLangText').textContent).toEqual('<p>value</p>');
    await fireEvent.click(container.querySelector('.toggleShowHtmlBtn') as HTMLButtonElement);
    expect(container.querySelector('.defaultLangText').textContent).toEqual('value');
  });

  it('does not render HTML preview button if not an HTML key', async () => {
    const fullKey = 'this.is.a.test';
    const defaultDict = { test: 'value' };
    const { container } = render(DefaultLangValue, { fullKey, key, defaultDict });
    expect(container.querySelector('.toggleShowHtmlBtn')).not.toBeInTheDocument();
    expect(container.querySelector('.defaultLangText')).toBeInTheDocument();
    expect(container.querySelector('.defaultLangText').textContent).toEqual('value');
  });
});
