<template>
  <div class="mt-8 max-w-2xl mx-auto text-slate-100">
    <h3 class="text-2xl font-semibold mb-6 tracking-wide">統計情報</h3>

    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="rounded-2xl border border-sky-400/30 bg-gradient-to-br from-sky-500/20 via-sky-500/10 to-transparent p-4 text-center shadow-lg shadow-sky-500/10">
        <div class="text-3xl font-bold text-sky-200">{{ stats.xWins }}</div>
        <div class="text-sm text-slate-200/80">X の勝利</div>
        <div class="text-xs text-slate-300/70">{{ stats.xWinRate }}%</div>
      </div>

      <div class="rounded-2xl border border-rose-400/30 bg-gradient-to-br from-rose-500/25 via-rose-500/10 to-transparent p-4 text-center shadow-lg shadow-rose-500/10">
        <div class="text-3xl font-bold text-rose-200">{{ stats.oWins }}</div>
        <div class="text-sm text-slate-200/80">O の勝利</div>
        <div class="text-xs text-slate-300/70">{{ stats.oWinRate }}%</div>
      </div>

      <div class="rounded-2xl border border-violet-300/30 bg-gradient-to-br from-violet-500/20 via-violet-500/10 to-transparent p-4 text-center shadow-lg shadow-violet-500/10">
        <div class="text-3xl font-bold text-violet-200">{{ stats.draws }}</div>
        <div class="text-sm text-slate-200/80">引き分け</div>
        <div class="text-xs text-slate-300/70">{{ stats.drawRate }}%</div>
      </div>

      <div class="rounded-2xl border border-emerald-300/30 bg-gradient-to-br from-emerald-500/25 via-emerald-500/10 to-transparent p-4 text-center shadow-lg shadow-emerald-500/10">
        <div class="text-3xl font-bold text-emerald-200">{{ stats.total }}</div>
        <div class="text-sm text-slate-200/80">総ゲーム数</div>
      </div>
    </div>

    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold tracking-wide">ゲーム履歴</h3>
      <button
        v-if="history.length > 0"
        @click="$emit('clear-history')"
        class="px-4 py-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-red-500 text-xs font-medium uppercase tracking-wider
               text-white shadow-md shadow-rose-500/20 hover:from-rose-400 hover:to-red-400 transition-all duration-300"
      >
        履歴をクリア
      </button>
    </div>

    <div v-if="history.length === 0" class="text-center text-slate-300/70 py-8">
      まだゲーム履歴がありません
    </div>

    <div v-else ref="historyList" class="space-y-3 max-h-96 overflow-y-auto pr-1">
      <div
        v-for="(game, index) in history"
        :key="index"
        class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/20
               motion-preset-slide-left"
      >
        <div class="flex-1">
          <span class="font-semibold">
            <span v-if="game.isDraw" class="text-slate-300/80">引き分け</span>
            <span v-else :class="game.winner === 'X' ? 'text-sky-300' : 'text-rose-300'">
              {{ game.winner }} の勝利
            </span>
          </span>
          <span class="text-sm text-slate-400 ml-2">
            {{ formatDate(game.timestamp) }}
          </span>
        </div>

        <div class="grid h-16 w-16 grid-cols-3 gap-0.5 text-xs">
          <div
            v-for="(cell, cellIndex) in game.board"
            :key="cellIndex"
            class="flex items-center justify-center rounded border border-white/10 bg-white/5"
            :class="cell === 'X' ? 'text-sky-300' : cell === 'O' ? 'text-rose-300' : 'text-slate-400'"
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
