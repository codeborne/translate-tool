import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import ProjectSourceButton from './ProjectSourceButton.svelte'
import type {Project} from '../common/Project'

describe('ProjectSourceButton', () => {
  let project: Project = {url: 'http://example.com/i18n/', title: 'title', indent: 2}
  const defaultBranch = 'translations'
  const lang = 'et'
  it('renders', async () => {
    const {container} = render(ProjectSourceButton, {project, defaultBranch, lang})
    expect(container.querySelector('.sourceBtn')).to.exist
  })

  it('normal project links directly to source', async () => {
    const {container} = render(ProjectSourceButton, {project, defaultBranch, lang})
    const button = container.querySelector('.sourceBtn') as HTMLLinkElement
    expect(button.href).to.equal('http://example.com/i18n/et.json')
  })
})
