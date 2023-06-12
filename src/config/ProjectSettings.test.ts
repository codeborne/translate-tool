import {fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import ProjectSettings from './ProjectSettings.svelte'
import type {Project} from '../common/Project'
import {ProjectSource} from '../common/Project'
import {stub} from 'sinon'
import {tick} from 'svelte'
import localProjectStore from '../common/LocalProjectStore'

describe('ProjectSettings', () => {

  const projects: Project[] = [
    {title: 'one', indent: 2, url: 'oneUrl', token: 'oneToken', source: ProjectSource.Github},
    {title: 'two', indent: 2, url: 'twoUrl', token: 'twoToken', source: ProjectSource.Github},
    {title: 'three', indent: 2, url: 'threeUrl', token: 'threeToken', source: ProjectSource.Github}
  ]
  const selectedProject: Project = {title: 'three', indent: 2, url: 'threeUrl', token: 'threeToken', source: ProjectSource.Github}

  it('renders all input element values correctly', async () => {
    const {container} = render(ProjectSettings, {projects, selectedProject})
    expect((container.querySelector('.name-input') as HTMLInputElement).value).to.equal(selectedProject.title)
    expect((container.querySelector('.url-input') as HTMLInputElement).value).to.equal(selectedProject.url)
    expect((container.querySelector('.indent-input') as HTMLInputElement).value).to.equal(selectedProject.indent.toString())
    expect((container.querySelector('.token-input') as HTMLInputElement).value).to.equal(selectedProject.token)
  })

  it('gives prompt when clicking share button', async () => {
    const {container} = render(ProjectSettings, {projects, selectedProject})
    const shareBtn = container.querySelector('.shareBtn') as HTMLButtonElement
    expect(shareBtn).to.exist
    let prompt = stub(window, 'prompt')
    await fireEvent.click(shareBtn)
    expect(prompt).called
  })

  it('changes localstorage when editing', async () => {
    const projectsAfter: Project[] = [
      {title: 'one', indent: 2, url: 'oneUrl', token: 'oneToken', source: ProjectSource.Github},
      {title: 'two', indent: 2, url: 'twoUrl', token: 'twoToken', source: ProjectSource.Github},
      {title: 'three', indent: 2, url: 'threeUrl', token: 'threeToken', branch: 'translations', source: ProjectSource.Github}
    ]
    const {container} = render(ProjectSettings, {projects, selectedProject})
    const editBtn = container.querySelector('.editBtn') as HTMLButtonElement
    expect(editBtn).to.exist
    localProjectStore.clear()
    await fireEvent.click(editBtn)
    await tick()
    expect(localProjectStore.getProjects()).to.deep.equal(projectsAfter)
  })

  it('prompts user to confirm before deleting', async () => {
    const {container} = render(ProjectSettings, {projects, selectedProject})
    const deleteBtn = container.querySelector('.deleteBtn') as HTMLButtonElement
    expect(deleteBtn).to.exist
    let confirm = stub(window, 'confirm')
    await fireEvent.click(deleteBtn)
    expect(confirm).calledWith(`Are you sure you want to delete the project: three?`)
  })
})
