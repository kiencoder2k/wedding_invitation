import { copyFileSync, mkdirSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// One link per side; keep in sync with SIDES in src/config/invitation.ts
const SIDE_PAGES = ['nha-trai', 'nha-gai']

/** Copies dist/index.html to dist/<side>/index.html so GitHub Pages serves each link with 200. */
function sidePages(): Plugin {
  return {
    name: 'side-pages',
    apply: 'build',
    closeBundle() {
      for (const page of SIDE_PAGES) {
        mkdirSync(`dist/${page}`, { recursive: true })
        copyFileSync('dist/index.html', `dist/${page}/index.html`)
      }
    },
  }
}

export default defineConfig({
  base: '/wedding_invitation/',
  plugins: [react(), tailwindcss(), sidePages()],
  server: {
    allowedHosts: true,
  },
})
