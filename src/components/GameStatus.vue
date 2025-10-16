<template>
  <div class="text-center my-6">
    <div class="mb-4">
      <h2 v-if="!gameOver" class="text-2xl font-bold motion-preset-slide-right">
        現在のターン:
        <span :class="currentPlayer === 'X' ? 'text-blue-600' : 'text-red-600'">
          {{ currentPlayer }}
        </span>
      </h2>
      <h2 v-else class="text-3xl font-bold motion-preset-bounce">
        <span v-if="isDraw" class="text-gray-600">引き分け！</span>
        <span v-else :class="winner === 'X' ? 'text-blue-600' : 'text-red-600'">
          {{ winner }} の勝利！
        </span>
      </h2>
    </div>

    <button
      @click="$emit('reset')"
      class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg
             hover:bg-blue-600 transition-colors duration-200
             motion-preset-slide-up"
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
