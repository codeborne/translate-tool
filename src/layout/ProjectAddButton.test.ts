import { render } from '@testing-library/svelte';
import ProjectAddButton from './ProjectAddButton.svelte';

describe('ProjectAddButton', () => {
  let showAddProject = true;

  it('does not show button if true', async () => {
    const { container } = render(ProjectAddButton, { showAddProject });
    const button = container.querySelector('button') as HTMLButtonElement;
    expect(button).not.toBeInTheDocument();
  });

  it('shows button if false', async () => {
    showAddProject = false;
    const { container } = render(ProjectAddButton, { showAddProject });
    const button = container.querySelector('button') as HTMLButtonElement;
    expect(button).toBeInTheDocument();
  });
});
