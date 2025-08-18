import { vi } from 'vitest';

const jsonLoader = {
  loadJson: vi.fn(),
  loadProjects: vi.fn(),
  request: vi.fn(),
  loadFor: vi.fn()
}

export default jsonLoader