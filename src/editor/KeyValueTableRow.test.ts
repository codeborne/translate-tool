import { render } from '@testing-library/svelte';
import KeyValueTableRow from './KeyValueTableRow.svelte';
import type { Dict } from '../common/Project';
import Filter from './Filter';

describe('<KeyValueTableRow>', () => {
  const dict: Dict = {
    world: 'hello',
    hello: 'world',
    nested: {
      another: 'worlddd',
      ping: 'pong',
      more_nested: {
        foo: 'bar',
        bar: 'foo',
      },
    },
  };

  let excludedKeys: Set<string> = new Set([]);
  let lang = 'en';
  const defaultLang = 'en';
  const filter = new Filter();
  const defaultDict: Dict = dict;
  const uneditedDict: Dict = dict;
  const isFirefox = false;

  it('renders all inputs', () => {
    const { container } = render(KeyValueTableRow, { defaultLang, isFirefox, dict, defaultDict, uneditedDict, filter, lang, excludedKeys });
    const rows = container.querySelectorAll('tr');
    const firstRow = rows[0].querySelectorAll('td');
    const lastRow = rows[rows.length - 1].querySelectorAll('td');
    expect(firstRow).toHaveLength(3);
    expect(firstRow[0].textContent).toContain('world');
    expect(firstRow[2].textContent).toContain('hello');
    expect(lastRow).toHaveLength(3);
    expect(lastRow[0].textContent).toContain('nested.more_nested.bar');
    expect(lastRow[2].textContent).toContain('foo');
  });

  it('shows only filtered inputs', () => {
    filter.search = 'nested';
    const { container } = render(KeyValueTableRow, { defaultLang, isFirefox, dict, defaultDict, uneditedDict, filter, lang, excludedKeys });
    const inputs = container.querySelectorAll('.not-html');
    expect(inputs).toHaveLength(4);
    expect(inputs[0].textContent).toContain('worlddd');
    expect(container.textContent).not.toContain('hello');
  });

  it('does not contain individual keys that are not supposed to be translated', () => {
    filter.search = '';
    lang = 'de';
    excludedKeys = new Set(['nested.ping']);
    const { container } = render(KeyValueTableRow, { defaultLang, dict, isFirefox, defaultDict, uneditedDict, filter, lang, excludedKeys });
    const inputs = container.querySelectorAll('.not-html');
    expect(inputs).toHaveLength(5);
    expect(container.textContent).not.toContain('nested.ping');
    expect(container.textContent).not.toContain('pong');
    expect(container.textContent).toContain('nested.another');
  });

  it('does not contain objects that are not supposed to be translated', () => {
    filter.search = '';
    lang = 'de';
    excludedKeys = new Set(['nested.more_nested']);
    const { container } = render(KeyValueTableRow, { defaultLang, dict, defaultDict, isFirefox, uneditedDict, filter, lang, excludedKeys });
    const inputs = container.querySelectorAll('.not-html');
    expect(inputs).toHaveLength(4);
    expect(container.textContent).not.toContain('nested.more_nested.foo');
    expect(container.textContent).not.toContain('nested.more_nested.bar');
    expect(container.textContent).toContain('nested.another');
  });

  it('shows label if cannot be translated but default lang is selected', () => {
    const untranslatableLabel = 'Marked as untranslatable';
    filter.search = '';
    lang = 'en';
    excludedKeys = new Set(['nested.more_nested', 'nested.another']);
    const { container } = render(KeyValueTableRow, { defaultLang, dict, defaultDict, isFirefox, uneditedDict, filter, lang, excludedKeys });
    const rows = container.querySelectorAll('tr');
    expect(rows).toHaveLength(6);
    expect(rows[0].querySelectorAll('td')[0].textContent).not.toContain(untranslatableLabel);
    expect(rows[1].querySelectorAll('td')[0].textContent).not.toContain(untranslatableLabel);
    expect(rows[2].querySelectorAll('td')[0].textContent).toContain(untranslatableLabel);
    expect(rows[3].querySelectorAll('td')[0].textContent).not.toContain(untranslatableLabel);
    expect(rows[4].querySelectorAll('td')[0].textContent).toContain(untranslatableLabel);
    expect(rows[5].querySelectorAll('td')[0].textContent).toContain(untranslatableLabel);
  });
});
