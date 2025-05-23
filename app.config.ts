import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from '@tanstack/react-start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    // prerender: {
    //   crawlLinks: true,
    //   routes: ['/'],
    // },
    preset: 'vercel',
  },

  vite: {
    plugins: [
      tsConfigPaths(),
      tailwindcss(),
    ],
  },
})
