import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    plugins: [svelte(),tailwindcss()],
    publicDir: path.resolve(__dirname, 'src/renderer/public'),
    build:{
      rollupOptions:{
        input:{
          index: path.resolve(__dirname, 'src/renderer/index.html'),
          widget: path.resolve(__dirname, 'src/renderer/widget.html')
        }
      }
    }
  }
})

