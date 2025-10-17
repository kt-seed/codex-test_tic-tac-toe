<template>
  <div class="text-center my-6 text-slate-100">
    <div class="mb-6">
      <h2 v-if="!gameOver" class="text-2xl font-semibold tracking-wide motion-preset-slide-right">
        現在のターン:
        <span :class="currentPlayer === 'X' ? 'text-sky-300' : 'text-rose-300'">
          {{ currentPlayer }}
        </span>
      </h2>
      <h2 v-else class="text-3xl font-bold motion-preset-bounce">
        <span v-if="isDraw" class="text-slate-300">引き分け！</span>
        <span v-else :class="winner === 'X' ? 'text-sky-300' : 'text-rose-300'">
          {{ winner }} の勝利！
        </span>
      </h2>
    </div>

    <button
      @click="$emit('reset')"
      class="px-8 py-3 font-semibold rounded-xl shadow-lg shadow-purple-500/20
             bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 text-white
             hover:from-sky-400 hover:via-indigo-400 hover:to-fuchsia-400
             transition-all duration-300 motion-preset-slide-up"
    >
      新しいゲーム
    </button>
  </div>
</template>

<script setup>
defineProps({
  currentPlayer: {
    type: String,
    required: true
  },
  gameOver: {
    type: Boolean,
    default: false
  },
  winner: {
    type: String,
    default: null
  },
  isDraw: {
    type: Boolean,
    default: false
  }
})

defineEmits(['reset'])
</script>
