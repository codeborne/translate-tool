import { act, fireEvent, render } from '@testing-library/svelte';
import GitHubProjectImporter from './GitHubProjectImporter.svelte';
import { GitHubClient } from '../github/GitHubClient';

async function fillProjectFields(container: HTMLElement) {
  const inputs = [...container.querySelectorAll('input')];
  inputs[0].value = 'projectname';
  inputs[1].value = 'repoowner';
  inputs[2].value = 'reponame';
  inputs[3].value = '/path/';
  inputs[4].value = 'token';
  expect(inputs[5].value).toContain('translations');
  await Promise.all(inputs.map(async (i) => await fireEvent.input(i)));
  return inputs;
}

describe('GitHubProjectImporter', () => {
  it('shows error if invalid project', async () => {
    vi.spyOn(GitHubClient.prototype, 'getFileContent').mockResolvedValue(undefined);

    const { container } = render(GitHubProjectImporter);
    await fillProjectFields(container);
    await fireEvent.submit(container.querySelector('form'));

    expect(GitHubClient.prototype.getFileContent).toHaveBeenCalledWith('langs.json');
    await act(() => vi.spyOn(GitHubClient.prototype, 'getFileContent'));

    expect(container.querySelector('.alert-warning').textContent).toContain('Could not load project');
  });

  it('saves project on valid submit', async () => {
    const { container, component } = render(GitHubProjectImporter);
    const inputs = await fillProjectFields(container);

    vi.spyOn(GitHubClient.prototype, 'getFileContent').mockResolvedValue(['en', 'de']);
    const importedCallback = vi.fn();
    component.$on('imported', importedCallback);
    await fireEvent.submit(container.querySelector('form'));
    expect(component.project.url).toEqual(`https://api.github.com/repos/${inputs[1].value}/${inputs[2].value}/contents${inputs[3].value}`);

    expect(GitHubClient.prototype.getFileContent).toHaveBeenCalledWith('langs.json');
    expect(container.querySelector('.alert-warning')).not.toBeInTheDocument();
    expect(component.project.token).toEqual(inputs[4].value);
    expect(importedCallback).toHaveBeenCalledWith(expect.objectContaining({ detail: component.project }));
  });
});

