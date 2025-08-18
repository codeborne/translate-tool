import { fireEvent, render } from '@testing-library/svelte';
import SimpleProjectImporter from './SimpleProjectImporter.svelte';
import { tick } from 'svelte';

describe('SimpleProjectImporter', () => {
  it('shows error if invalid url', async () => {
    const { container } = render(SimpleProjectImporter);
    const button = container.querySelector('button') as HTMLButtonElement;
    expect(button.textContent).toContain('Import');
    expect(container.querySelector('.alert')).not.toBeInTheDocument();
    const inputs = container.querySelectorAll('input');
    inputs[0].value = 'name';
    inputs[1].value = 'https://test.com/test/';
    await fireEvent.click(button);
    await tick();
    expect(container.querySelector('.alert')).toBeInTheDocument();
  });

  it('saves project on valid submit', async () => {
    const { container } = render(SimpleProjectImporter);
    const button = container.querySelector('button') as HTMLButtonElement;
    expect(button.textContent).toContain('Import');
    const inputs = container.querySelectorAll('input');
    inputs[0].value = 'name';
    inputs[1].value = 'https://test.com/test/';
    vi.spyOn(window, 'fetch').mockResolvedValue({ json: async () => ['en', 'de'] } as Response);
    await fireEvent.click(button);
    await tick();

    // TODO improve these tests
  });
});
