import { render } from '@testing-library/svelte';
import ProjectSettingsButton from './ProjectSettingsButton.svelte';

describe('ProjectSettingsButton', () => {
  let showConfig = true;
  let showAddProject = false;
  let showBack = true;

  it('renders back button if config open', async () => {
    const { container } = render(ProjectSettingsButton, { showConfig, showAddProject, showBack });
    expect(container.querySelector('#backToEditorBtn')).toBeInTheDocument();
  });

  it('renders back button if project editor open', async () => {
    showConfig = false;
    showAddProject = true;
    const { container } = render(ProjectSettingsButton, { showConfig, showAddProject, showBack });
    expect(container.querySelector('#backToEditorBtn')).toBeInTheDocument();
    expect(container.querySelector('#backToImporterBtn')).not.toBeInTheDocument();
  });

  it('does not render back button if in dict editor', async () => {
    showConfig = false;
    showAddProject = false;
    const { container } = render(ProjectSettingsButton, { showConfig, showAddProject, showBack });
    expect(container.querySelector('#backToEditorBtn')).not.toBeInTheDocument();
    expect(container.querySelector('#backToImporterBtn')).toBeInTheDocument();
  });
});
