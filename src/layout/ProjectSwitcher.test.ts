import {fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import ProjectSwitcher from './ProjectSwitcher.svelte'
import {LoadedProject, Project} from '../common/Project'
import {tick} from 'svelte'
import localProjectStore from '../common/LocalProjectStore'

let projects: LoadedProject[] = [
  new LoadedProject({url: 'url', indent: 2, token: 'token', title: 'test'} as Project, {de: {}, et: {}, es: {}}),
  new LoadedProject({url: 'url2', indent: 2, token: 'token2', title: 'title2'} as Project, {de: {}, et: {}, es: {}})
]
let selectedProject: LoadedProject = projects[0]

describe('ProjectSwitcher', () => {
  it('renders navigation links', async () => {
    const {container} = render(ProjectSwitcher, {projects, selectedProject})
    expect(container.querySelectorAll('.nav-link')[0].textContent).to.contain('test')
    expect(container.querySelectorAll('.nav-link')[1].textContent).to.contain('title2')
    expect(container.querySelectorAll('.nav-link')[0].classList.contains('active')).to.be.true
  })

  it('sets clicked project as the selected project in localstorage', async () => {
    const {container} = render(ProjectSwitcher, {projects, selectedProject})
    let tabs = container.querySelectorAll('.nav-link')
    expect(tabs[0].classList.contains('active')).to.be.true
    await fireEvent.click(tabs[1])
    await tick()
    expect(tabs[0].classList.contains('active')).to.be.false
    expect(tabs[1].classList.contains('active')).to.be.true
    expect(localProjectStore.getSelectedProject()).to.equal('title2')

  })
})
