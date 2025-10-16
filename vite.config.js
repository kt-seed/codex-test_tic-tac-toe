import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 環境変数でbaseパスを動的に設定（PRプレビュー対応）
  base: process.env.VITE_BASE_PATH || '/Codex_tictactoe/',
})
