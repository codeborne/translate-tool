import { render } from '@testing-library/svelte';
import ConfigClipboardOutput from './ConfigClipboardOutput.svelte';

describe('ConfigClipboardOutput', () => {
  const config = { title: 'a project', indent: 2, url: 'oneUrl.url', token: 'secret' };

  it('shows project config as json', async () => {
    const { container } = render(ConfigClipboardOutput, { config });
    expect(container.querySelector('textarea').value).toContain(JSON.stringify(config, null, 2));
  });
});
