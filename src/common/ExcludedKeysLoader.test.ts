import { excludedKeysLoader } from './ExcludeKeysLoader';
import type { Project } from './Project';
import jsonLoader from './JsonLoader';

describe('ExcludedKeys', () => {
  const response: Set<string> = new Set(['test1', 'test2']);
  const project: Project = {
    title: 'Title',
    url: 'url',
    indent: 2,
  };

  it('calls jsonLoader and returns array of strings', async () => {
    vi.spyOn(jsonLoader, 'loadFor').mockResolvedValue(response);
    expect(await excludedKeysLoader.fetch(project)).toEqual(response);
    expect(jsonLoader.loadFor).toHaveBeenCalledWith(project, 'dont-translate-keys');
  });
});
