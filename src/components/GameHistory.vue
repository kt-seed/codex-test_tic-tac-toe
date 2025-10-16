<template>
  <div class="mt-8 max-w-2xl mx-auto">
    <h3 class="text-2xl font-bold mb-4">統計情報</h3>

    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="bg-blue-100 p-4 rounded-lg text-center">
        <div class="text-3xl font-bold text-blue-600">{{ stats.xWins }}</div>
        <div class="text-sm text-gray-600">X の勝利</div>
        <div class="text-xs text-gray-500">{{ stats.xWinRate }}%</div>
      </div>

      <div class="bg-red-100 p-4 rounded-lg text-center">
        <div class="text-3xl font-bold text-red-600">{{ stats.oWins }}</div>
        <div class="text-sm text-gray-600">O の勝利</div>
        <div class="text-xs text-gray-500">{{ stats.oWinRate }}%</div>
      </div>

      <div class="bg-gray-100 p-4 rounded-lg text-center">
        <div class="text-3xl font-bold text-gray-600">{{ stats.draws }}</div>
        <div class="text-sm text-gray-600">引き分け</div>
        <div class="text-xs text-gray-500">{{ stats.drawRate }}%</div>
      </div>

      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-3xl font-bold text-green-600">{{ stats.total }}</div>
        <div class="text-sm text-gray-600">総ゲーム数</div>
      </div>
    </div>

    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold">ゲーム履歴</h3>
      <button
        v-if="history.length > 0"
        @click="$emit('clear-history')"
        class="px-4 py-1 bg-red-500 text-white text-sm rounded
               hover:bg-red-600 transition-colors duration-200"
      >
        履歴をクリア
      </button>
    </div>

    <div v-if="history.length === 0" class="text-center text-gray-500 py-8">
      まだゲーム履歴がありません
    </div>

    <div v-else ref="historyList" class="space-y-2 max-h-96 overflow-y-auto">
      <div
        v-for="(game, index) in history"
        :key="index"
        class="bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center
               motion-preset-slide-left"
      >
        <div class="flex-1">
          <span class="font-semibold">
            <span v-if="game.isDraw" class="text-gray-600">引き分け</span>
            <span v-else :class="game.winner === 'X' ? 'text-blue-600' : 'text-red-600'">
              {{ game.winner }} の勝利
            </span>
          </span>
          <span class="text-sm text-gray-500 ml-2">
            {{ formatDate(game.timestamp) }}
          </span>
        </div>

        <div class="grid grid-cols-3 gap-0.5 w-16 h-16 text-xs">
          <div
            v-for="(cell, cellIndex) in game.board"
            :key="cellIndex"
            class="border border-gray-300 flex items-center justify-center"
            :class="cell === 'X' ? 'text-blue-600' : cell === 'O' ? 'text-red-600' : ''"
          >
            {{ cell || '' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { autoAnimate } from '@formkit/auto-animate'

defineProps({
  history: {
    type: Array,
    required: true
  },
  stats: {
    type: Object,
    required: true
  }
})

defineEmits(['clear-history'])

const historyList = ref(null)

onMounted(() => {
  if (historyList.value) {
    autoAnimate(historyList.value)
  }
})

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const diff = Date.now() - date.getTime()

  // 1分未満
  if (diff < 60000) {
    return 'たった今'
  }

  // 1時間未満
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000)
    return `${minutes}分前`
  }

  // 24時間未満
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000)
    return `${hours}時間前`
  }

  // それ以外
  return date.toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
