import { render } from '@testing-library/svelte';
import Navbar from './Navbar.svelte';

describe('Navbar', () => {
  it('renders title', async () => {
    const { container } = render(Navbar);
    expect(container.querySelector('.nav-logo')).toBeInTheDocument();
  });
});
