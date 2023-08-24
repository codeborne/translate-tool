export const url = process.env.TEST_URL ?? 'http://localhost:8080'
export const projectGithub = process.env.PROJECT_GITHUB
console.log('PGITHUB', projectGithub?.substring(1, projectGithub.length - 2))
