import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.VITE_BASE_URL || '/codex-test_tic-tac-toe/', // GitHub Pagesのリポジトリ名に合わせて設定
})
