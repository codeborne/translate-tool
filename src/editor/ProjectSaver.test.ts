import { act, fireEvent, render } from '@testing-library/svelte';
import type { Dict, Project } from '../common/Project';
import { ProjectSource } from '../common/Project';
import ProjectSaver from './ProjectSaver.svelte';
import { GitHubClient } from '../github/GitHubClient';
import type { GoogleProfile } from '../common/GoogleTypes';

describe('ProjectSaver', () => {
  const dict: Dict = {};
  const defaultDict: Dict = {};
  const lang = 'en';
  const config: Project = { title: '', url: 'api.github.com', token: '', indent: 2, source: ProjectSource.Github };
  const user: GoogleProfile | undefined = undefined;

  async function clickSaveButton(message: string) {
    const { container } = render(ProjectSaver, { dict, lang, config, user, defaultDict });
    vi.spyOn(window, 'prompt').mockReturnValue(message);
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    vi.spyOn(GitHubClient.prototype, 'saveFile').mockResolvedValue(undefined);
    const save = vi.fn();
    const button = container.querySelector('button');
    button.addEventListener('click', save);
    await fireEvent.click(button);
    return save;
  }

  it('user gets prompt to commit changes on button click', async () => {
    const save = await clickSaveButton('');
    expect(save).toHaveBeenCalled();
    expect(window.prompt).toHaveBeenCalled();
    expect(GitHubClient.prototype.saveFile).not.toHaveBeenCalled();
  });

  it('user can change the default commit and save', async () => {
    const save = await clickSaveButton('Custom message');
    expect(save).toHaveBeenCalled();
    expect(GitHubClient.prototype.saveFile).toHaveBeenCalledWith(lang, dict, defaultDict, 'Custom message');
    await act(() => vi.spyOn(GitHubClient.prototype, 'saveFile'));
    expect(window.alert).toHaveBeenCalled();
  });

  it('commit button shows default translations branch if no branch in config', async () => {
    const { container } = render(ProjectSaver, { dict, lang, config, user, defaultDict });
    const btn = container.querySelector('button');
    expect(btn.textContent).toContain('Save to translations branch');
  });

  it('commit button shows config branch', async () => {
    config.branch = 'test';
    const { container } = render(ProjectSaver, { dict, lang, config, user, defaultDict });
    const btn = container.querySelector('button');
    expect(btn.textContent).toContain('Save to test branch');
  });
});
