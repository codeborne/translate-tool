import jsonLoader from './JsonLoader';
import type { Project } from './Project';
import { ProjectSource } from './Project';

describe('JsonLoader', () => {
  const project: Project = {
    title: 'some+project',
    url: 'some_project_url/langs.json',
    token: 'some_access_token',
    indent: 2,
    source: ProjectSource.SimpleProject,
  };
  const response = ['test1', 'test2'];

  it('successfully returns a response', async () => {
    vi.spyOn(jsonLoader, 'loadFor').mockResolvedValue(response);
    expect(await jsonLoader.loadFor(project, 'tests')).toEqual(response);
    expect(jsonLoader.loadFor).toHaveBeenCalledWith(project, 'tests');
  });

  it('returns error if fetch fails', async () => {
    try {
      vi.spyOn(window, 'fetch').mockResolvedValue({ ok: false, json: () => Promise.resolve("{}") } as Response);
      await jsonLoader.loadJson(project.url);
      throw 'expecting failure';
      // @ts-ignore
    } catch (e: Error) {
      expect(e.message).toEqual(`Failed to load ${project.url}`);
    }
  });
});
