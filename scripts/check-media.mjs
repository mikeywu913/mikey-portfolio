import { readdir, readFile } from 'node:fs/promises'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { imageWorks, musicWorks, videoWorks } from '../src/works.js'
import { projectWorks } from '../src/projects.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const errors = []
const publicPaths = new Set(['favicon.svg'])

async function checkCaseSensitivePath(file) {
  const parts = relative(root, file).split(sep)
  let current = root
  for (const part of parts) {
    const entries = await readdir(current)
    if (!entries.includes(part)) throw new Error(`Missing file or incorrect letter case: ${relative(root, file)}`)
    current = join(current, part)
  }
}

async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name)
    if (entry.isDirectory()) { await scan(file); continue }
    if (!/\.(?:js|jsx|css)$/.test(entry.name)) continue
    const text = await readFile(file, 'utf8')
    for (const match of text.matchAll(/["'`]\/(works\/[^"'`]+)["'`]/g)) publicPaths.add(match[1])
    for (const match of text.matchAll(/\b(?:from|import)\s*["'](\.[^"']+)["']/g)) {
      try { await checkCaseSensitivePath(resolve(dirname(file), match[1])) }
      catch (error) { errors.push(error.message) }
    }
  }
}

await scan(join(root, 'src'))
for (const path of publicPaths) {
  try { await checkCaseSensitivePath(join(root, 'public', path)) }
  catch (error) { errors.push(error.message) }
}

function checkUrl(url, label) {
  if (!url || url.startsWith('/works/')) return
  try {
    if (new URL(url).protocol !== 'https:') throw new Error('Expected HTTPS')
  } catch { errors.push(`Invalid media URL in ${label}: ${url}`) }
}

for (const work of [...videoWorks, ...imageWorks, ...musicWorks, ...projectWorks]) {
  for (const key of ['src', 'videoUrl', 'cover']) checkUrl(work[key], work.id)
}
for (const work of videoWorks) if (!work.src) errors.push(`Missing playback URL: ${work.id}`)
for (const work of musicWorks) if (!work.src && !work.videoUrl) errors.push(`Missing audio or MV: ${work.id}`)

if (errors.length) {
  console.error([...new Set(errors)].join('\n'))
  process.exitCode = 1
} else {
  console.log(`Media check passed: ${publicPaths.size} public files, ${videoWorks.length} video entries, ${musicWorks.length} music entries; local imports match exact filename case.`)
}
