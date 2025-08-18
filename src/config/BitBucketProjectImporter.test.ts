import { act, fireEvent, render } from '@testing-library/svelte';
import BitBucketProjectImporter from './BitBucketProjectImporter.svelte';
import { BitBucketClient } from '../bitbucket/BitBucketClient';

describe('BitBucketProjectImporter', () => {
  async function fillProjectFields(container: HTMLElement) {
    const inputs = [...container.querySelectorAll('input')];
    inputs[0].value = 'projectname';
    inputs[1].value = 'repoowner';
    inputs[2].value = 'reponame';
    inputs[3].value = 'main';
    inputs[4].value = '/path/';
    inputs[5].value = 'token';
    inputs[6].value = 'translations';
    await Promise.all(inputs.map(async (i) => await fireEvent.input(i)));
    expect(inputs[3].value).toContain('main');
    return inputs;
  }

  it('shows error if invalid project', async () => {
    vi.spyOn(BitBucketClient.prototype, 'getFileContent').mockResolvedValue(undefined);
    const { container } = render(BitBucketProjectImporter);
    await fillProjectFields(container);
    await fireEvent.submit(container.querySelector('form'));
    expect(BitBucketClient.prototype.getFileContent).toHaveBeenCalledWith('langs.json');
    await act(() => vi.spyOn(BitBucketClient.prototype, 'getFileContent'));
    expect(container.querySelector('.alert-warning').textContent).toContain('Could not load project');
  });

  it('saves project on valid submit', async () => {
    const { container, component } = render(BitBucketProjectImporter);
    const inputs = await fillProjectFields(container);

    vi.spyOn(BitBucketClient.prototype, 'getFileContent').mockResolvedValue(['en', 'de']);
    const importedCallback = vi.fn();
    component.$on('imported', importedCallback);
    await fireEvent.submit(container.querySelector('form'));
    expect(component.project.url).toEqual(`https://api.bitbucket.org/2.0/repositories/repoowner/reponame/src/main/path/`);

    expect(BitBucketClient.prototype.getFileContent).toHaveBeenCalledWith('langs.json');
    expect(container.querySelector('.alert-warning')).not.toBeInTheDocument();
    expect(component.project.token).toEqual(inputs[5].value);
    expect(importedCallback).toHaveBeenCalledWith(expect.objectContaining({ detail: component.project }));
  });
});
