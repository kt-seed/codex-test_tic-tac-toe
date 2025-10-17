<template>
  <div class="inline-block rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
    <div class="grid grid-cols-3 gap-3">
      <Cell
        v-for="(cell, index) in board"
        :key="index"
        :value="cell"
        :disabled="gameOver"
        :is-winning-cell="isWinningCell(index)"
        :index="index"
        @click="handleCellClick(index)"
      />
    </div>
  </div>
</template>

<script setup>
import Cell from './Cell.vue'

const props = defineProps({
  board: {
    type: Array,
    required: true
  },
  gameOver: {
    type: Boolean,
    default: false
  },
  winningLine: {
    type: Array,
    default: null,
    validator: (value) => value === null || Array.isArray(value)
  }
})

const emit = defineEmits(['move'])

const handleCellClick = (index) => {
  emit('move', index)
}

const isWinningCell = (index) => {
  return props.winningLine?.includes(index) ?? false
}
</script>
