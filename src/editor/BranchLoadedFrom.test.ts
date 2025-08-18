import { render } from '@testing-library/svelte';
import BranchLoadedFrom from './BranchLoadedFrom.svelte';
import type { Project, ProjectMeta } from '../common/Project';

describe('BranchLoadedFrom', () => {
  const config: Project = { url: 'https://api.github.com/repos/org/repo/contents/i18n/', token: 'token', indent: 2, title: 'title' };
  const projectMeta: ProjectMeta = { branchLoadedFrom: 'test' };

  it.skip('renders custom/translations branch from config', async () => {
    const { container } = render(BranchLoadedFrom, { config, projectMeta });
    const text = container.querySelector('.branch').textContent;
    expect(text).toContain('Loaded from test branch');
  });

  it('does not render if not a github project', async () => {
    config.url = 'not.github.url';
    const { container } = render(BranchLoadedFrom, { config, projectMeta });
    expect(container.querySelector('.branch')).not.toBeInTheDocument();
  });
});
