export const url = process.env.TEST_URL ?? 'http://localhost:8080'
export const projectGithub = process.env.PROJECT_GITHUB
if (projectGithub) console.log('PGITHUB', btoa(projectGithub))
