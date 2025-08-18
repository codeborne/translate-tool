import { render } from '@testing-library/svelte';
import App from './App.svelte';
import { tick } from 'svelte';
import jsonLoader from './common/JsonLoader';
import type { Project } from './common/Project';
import { LoadedProject, ProjectSource } from './common/Project';
import localProjectStore from './common/LocalProjectStore';

const project: Project = {
  title: 'TestTitle',
  url: 'TestUrl',
  indent: 2,
  source: ProjectSource.SimpleProject,
};

const loadedProject = new LoadedProject(project, { en: { hello: 'world', world: 'hello' } });

describe('<App>', () => {
  beforeEach(() => {
    vi.spyOn(jsonLoader, 'loadProjects').mockResolvedValue([loadedProject]);
    localProjectStore.clear();
  });

  it.skip('renders importer with no config file nor localstorage', async () => {
    vi.spyOn(jsonLoader, 'loadJson').mockResolvedValue(undefined);
    vi.spyOn(localProjectStore, 'getProjects').mockReturnValue([]);
    render(App);
    expect(jsonLoader.loadJson).toHaveBeenCalledWith('projects.json');
    expect(localProjectStore.getProjects).toHaveBeenCalled();
    await tick();
    await tick();
    expect(document.querySelector('.import')).toBeInTheDocument();
  });

  it.skip('renders editor if localStorage exists, but no deployed projects', async () => {
    vi.spyOn(jsonLoader, 'loadJson').mockResolvedValue(undefined);
    vi.spyOn(localProjectStore, 'getProjects').mockReturnValue([project]);
    localProjectStore.setProjects([project]);
    render(App);
    expect(localProjectStore.getProjects).toHaveBeenCalled();

    expect(jsonLoader.loadProjects).toHaveBeenCalledWith([project]);

    await tick();
    expect(document.querySelector('#output')).toBeInTheDocument();
  });

  it.skip('renders editor if project file exists', async () => {
    vi.spyOn(jsonLoader, 'loadJson').mockImplementation((url: string) => {
      if (url === 'projects.json') {
        return Promise.resolve([project]);
      }
      return Promise.resolve(undefined);
    });
    render(App);
    expect(document.querySelector('main')).toBeInTheDocument();

    expect(jsonLoader.loadJson).toHaveBeenCalledWith('projects.json');

    expect(jsonLoader.loadProjects).toHaveBeenCalledWith([project]);
    expect(document.querySelector('#output')).toBeInTheDocument();
  });
});
