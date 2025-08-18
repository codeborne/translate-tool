import { render } from '@testing-library/svelte';
import FilterControls from './FilterControls.svelte';
import Filter from './Filter';

describe('FilterControls', () => {
  const filter: Filter = new Filter('test', false);

  it('Shows correct filters on render', async () => {
    const { container } = render(FilterControls, { filter });
    expect(container.querySelector('.form-check-label').textContent).toContain('Show only empty');
    expect((container.querySelector('.form-control') as HTMLInputElement).value).toEqual('test');
    expect((container.querySelector('.form-check-input') as HTMLInputElement).value).toEqual('on');
  });
});
