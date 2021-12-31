import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import ProjectSettings from './ProjectSettings.svelte'
import type {Project} from '../common/Project'

describe('ProjectSettings', () => {

  const projects: Project[] = [
    {title: 'one', indent: 2, url: 'oneUrl', token: 'oneToken'},
    {title: 'two', indent: 2, url: 'twoUrl', token: 'twoToken'},
    {title: 'three', indent: 2, url: 'threeUrl', token: 'threeToken'}
  ]
  const selectedProject: Project = {title: 'two', indent: 2, url: 'twoUrl', token: 'twoToken'}

  it('renders all input element values correctly', async () => {
    const {container} = render(ProjectSettings, {projects, selectedProject})
    expect((container.querySelector('.name-input') as HTMLInputElement).value).to.equal(selectedProject.title)
    expect((container.querySelector('.url-input') as HTMLInputElement).value).to.equal(selectedProject.url)
    expect((container.querySelector('.indent-input') as HTMLInputElement).value).to.equal(selectedProject.indent.toString())
    expect((container.querySelector('.token-input') as HTMLInputElement).value).to.equal(selectedProject.token)
  })
})
