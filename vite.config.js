import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/Codex_tictactoe/', // GitHub Pagesのリポジトリ名に合わせて設定
})
