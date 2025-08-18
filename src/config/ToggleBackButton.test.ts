import { render } from '@testing-library/svelte';
import ToggleBackButton from './ToggleBackButton.svelte';

describe('ToggleBackButton', () => {
  let showConfig = true;
  let showAddProject = false;
  let showBack = true;
  it('renders', async () => {
    const { container } = render(ToggleBackButton, { showConfig, showAddProject, showBack });
    expect(container.querySelector('.backBtn')).toBeInTheDocument();
  });

  it('does not render', async () => {
    showBack = false;
    const { container } = render(ToggleBackButton, { showConfig, showAddProject, showBack });
    expect(container.querySelector('.backBtn')).not.toBeInTheDocument();
  });
});
