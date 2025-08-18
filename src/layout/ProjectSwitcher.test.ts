import { fireEvent, render } from '@testing-library/svelte'
import ProjectSwitcher from './ProjectSwitcher.svelte'
import { LoadedProject, Project } from '../common/Project'
import { tick } from 'svelte'
import localProjectStore from '../common/LocalProjectStore'

const projects: LoadedProject[] = [
  new LoadedProject({ url: 'url', indent: 2, token: 'token', title: 'test' } as Project, { de: {}, et: {}, es: {} }),
  new LoadedProject({ url: 'url2', indent: 2, token: 'token2', title: 'title2' } as Project, { de: {}, et: {}, es: {} }),
]
const selectedProject: LoadedProject = projects[0]

describe('ProjectSwitcher', () => {
  it('renders navigation links', async () => {
    const { container } = render(ProjectSwitcher, { projects, selectedProject })
    expect(container.querySelectorAll('.nav-link')[0].textContent).toContain('test')
    expect(container.querySelectorAll('.nav-link')[1].textContent).toContain('title2')
    expect(container.querySelectorAll('.nav-link')[0].classList.contains('active')).toBeTruthy()
  })

  it.skip('sets clicked project as the selected project in localstorage', async () => {
    vi.spyOn(localProjectStore, 'setSelectedProject').mockImplementation(() => {})
    const { container } = render(ProjectSwitcher, { projects, selectedProject })
    const tabs = container.querySelectorAll('.nav-link')
    await fireEvent.click(tabs[1])
    await tick()
    await tick()
    expect(tabs[0].classList.contains('active')).toBeFalsy()
    expect(tabs[1].classList.contains('active')).toBeTruthy()
  })
})
