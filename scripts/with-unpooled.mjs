// Run a command with DATABASE_URL replaced by DATABASE_URL_UNPOOLED (direct
// connection). Payload migrations need it; the app itself uses the pooled URL.
import { spawnSync } from 'node:child_process'
const env = { ...process.env }
if (env.DATABASE_URL_UNPOOLED) env.DATABASE_URL = env.DATABASE_URL_UNPOOLED
const [cmd, ...args] = process.argv.slice(2)
const r = spawnSync('npx', [cmd, ...args], { stdio: 'inherit', env, shell: process.platform === 'win32' })
process.exit(r.status ?? 1)
