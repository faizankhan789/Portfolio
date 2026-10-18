import { readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ssrDir = resolve(root, 'dist-ssr')
const entry = readdirSync(ssrDir).find((f) => /^entry-server\.(m?js)$/.test(f))
if (!entry) throw new Error('dist-ssr entry-server bundle not found')

const { render } = await import(pathToFileURL(resolve(ssrDir, entry)).href)
const htmlPath = resolve(root, 'dist/index.html')
const html = readFileSync(htmlPath, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error('root marker not found in dist/index.html')

writeFileSync(htmlPath, html.replace(marker, () => `<div id="root">${render()}</div>`))
rmSync(ssrDir, { recursive: true, force: true })
console.log('prerendered dist/index.html')
