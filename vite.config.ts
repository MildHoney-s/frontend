import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

// import { ViteFaviconsPlugin } from 'vite-plugin-favicon2'

// https://vitejs.dev/config/
export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@public': path.resolve(__dirname, './public'),
      },
    },
    plugins: [
      react(),
      // ViteFaviconsPlugin('./public/android-chrome-512x512.png'),
    ],
    server: {
      port: +process.env.VITE_PORT,
      host: true,
    },
    define: {
      'process.env': process.env,
    },
    build: {
      chunkSizeWarningLimit: 5000, // The limit size in kB
    },
  })
}
