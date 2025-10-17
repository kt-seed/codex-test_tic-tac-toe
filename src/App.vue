<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-5xl font-bold text-center mb-8 text-white tracking-tight motion-preset-slide-down">
        三目並べ
      </h1>

      <div class="flex flex-col items-center gap-8">
        <GameStatus
          :current-player="currentPlayer"
          :game-over="gameOver"
          :winner="winner"
          :is-draw="isDraw"
          @reset="handleReset"
        />

        <Board
          :board="board"
          :game-over="gameOver"
          :winning-line="winningLine"
          @move="handleMove"
          class="motion-preset-focus"
        />

        <GameHistory
          :history="historyStore.history"
          :stats="historyStore.stats"
          @clear-history="historyStore.clearHistory"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import Board from './components/Board.vue'
import GameStatus from './components/GameStatus.vue'
import GameHistory from './components/GameHistory.vue'
import { useGame } from './composables/useGame'
import { useGameHistoryStore } from './stores/gameHistory'

const {
  board,
  currentPlayer,
  gameOver,
  winner,
  winningLine,
  isDraw,
  makeMove,
  resetGame,
  getGameResult,
} = useGame()

const historyStore = useGameHistoryStore()

const handleMove = (index) => {
  makeMove(index)
}

const handleReset = () => {
  resetGame()
}

// ゲーム終了を監視して自動的に履歴に追加
watch(gameOver, (newValue) => {
  if (newValue) {
    // 少し遅延させてアニメーションを見せる
    setTimeout(() => {
      const result = getGameResult()
      if (result) {
        historyStore.addGame(result)
      }
    }, 1000)
  }
})
</script>
