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

  it('GitHub project links to root of source branch from where changes were loaded', async () => {
    let project: Project = {url: 'https://api.github.com/repos/org/repo/contents/path/to/langs/', title: 'title', indent: 2}
    const {container} = render(ProjectSourceButton, {project, defaultBranch, lang})
    const button = container.querySelector('.sourceBtn') as HTMLLinkElement
    expect(button.href).to.equal('https://github.com/org/repo/blob/translations/path/to/langs/et.json')
  })

  it('BitBucket project links to root of source branch from where changes were loaded', async () => {
    let project: Project = {url: 'https://api.bitbucket.org/2.0/repositories/org/repo/src/main/path/to/langs/', title: 'title', indent: 2}
    const {container} = render(ProjectSourceButton, {project, defaultBranch, lang})
    const button = container.querySelector('.sourceBtn') as HTMLLinkElement
    expect(button.href).to.equal('https://bitbucket.org/org/repo/src/translations/path/to/langs/et.json')
  })
})
