import { readFile, readdir, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { Plugin } from 'vite'

// Dev-server API for the sigil editor. Each sigil lives in its own file, so a
// save rewrites one small file instead of the whole pool.
const root = path.resolve(import.meta.dirname, '..')
const dataDir = path.join(root, 'data/sigils')
const iconDir = path.join(root, 'node_modules/@boxicons/core/svg/filled')
const CODE = /^[A-Z]{2}-[A-Z]\d+$/

async function iconSvg(name: string): Promise<string | null> {
  try {
    const svg = await readFile(path.join(iconDir, `bx-${name}.svg`), 'utf8')
    return svg.replace(/^<svg[^>]*>|<\/svg>\s*$/g, '')
  } catch {
    return null
  }
}

async function loadAll() {
  const files = (await readdir(dataDir)).filter((f) => f.endsWith('.json'))
  const sigils = await Promise.all(
    files.map(async (f) => JSON.parse(await readFile(path.join(dataDir, f), 'utf8'))),
  )
  const curated = (await readFile(path.join(root, 'docs/sigils/icons.txt'), 'utf8'))
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  const names = new Set([...curated, ...sigils.map((s) => s.icon)])
  const icons: Record<string, string> = {}
  await Promise.all(
    [...names].map(async (n) => {
      const svg = await iconSvg(n)
      if (svg) icons[n] = svg
    }),
  )
  return { sigils, icons, iconNames: curated }
}

function readBody(req: NodeJS.ReadableStream): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (c) => (body += c))
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

export function sigilApi(): Plugin {
  return {
    name: 'sigil-api',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res) => {
        const send = (status: number, data: unknown) => {
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(data))
        }
        try {
          const url = new URL(req.url ?? '/', 'http://x')
          const icon = url.pathname.match(/^\/icons\/([a-z0-9-]+)$/)
          const sigil = url.pathname.match(/^\/sigils\/([^/]+)$/)
          if (req.method === 'GET' && url.pathname === '/sigils') {
            return send(200, await loadAll())
          }
          if (req.method === 'GET' && icon) {
            const svg = await iconSvg(icon[1])
            return svg ? send(200, { svg }) : send(404, { error: 'unknown icon' })
          }
          if (req.method === 'PUT' && sigil && CODE.test(sigil[1])) {
            const data = JSON.parse(await readBody(req))
            if (data.code !== sigil[1]) return send(400, { error: 'code mismatch' })
            const file = path.join(dataDir, `${sigil[1]}.json`)
            // Merge onto the file so a stale editor tab keeps fields added on disk since it loaded.
            const existing = JSON.parse(await readFile(file, 'utf8').catch(() => '{}'))
            const tmp = `${file}.tmp`
            await writeFile(tmp, JSON.stringify({ ...existing, ...data }, null, 2) + '\n')
            await rename(tmp, file)
            return send(200, { ok: true })
          }
          send(404, { error: 'not found' })
        } catch (e) {
          send(500, { error: String(e) })
        }
      })
    },
  }
}
