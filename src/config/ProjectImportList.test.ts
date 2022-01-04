import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import ProjectImportList from './ProjectImportList.svelte'
import type {Project} from '../common/Project'

describe('ProjectImportList', () => {

  const projects: Project[] = [
    {title:'project', url:'someurl', indent: 2, token:'123123'}
  ]

  it('renders each individual import option', async () => {
    const {container} = render(ProjectImportList, {projects})
    expect(container.querySelector('.githubImport')!.textContent).to.contain('Via GitHub')
    expect(container.querySelector('.publicImport')!.textContent).to.contain('Via Public URL')
  })
})
