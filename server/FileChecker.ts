import fs from 'fs'

const path = './build/projects.json'

export function hasProjectsFile(): boolean {
    return fs.existsSync(path)
}