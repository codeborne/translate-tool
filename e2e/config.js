export const url = process.env.TEST_URL ?? 'http://localhost:8080'
export const projectGithub = process.env.PROJECT_GITHUB
if (!!projectGithub) console.log('PGITHUB2', btoa(projectGithub?.substring(0, 10)))
if (!!projectGithub) console.log('PGITHUB2', btoa(projectGithub?.substring(10, projectGithub.length)))
