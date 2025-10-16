<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    :aria-label="`セル ${index + 1}${value ? `: ${value}` : ''}`"
    :class="[
      'w-24 h-24 text-4xl font-bold border-2 border-gray-700',
      'transition-all duration-200',
      'hover:bg-gray-100 disabled:hover:bg-white',
      'focus:outline-none focus:ring-2 focus:ring-blue-500',
      isWinningCell ? 'bg-green-200' : 'bg-white',
      value ? 'cursor-default' : 'cursor-pointer'
    ]"
    class="motion-preset-pop"
  >
    <span
      v-if="value"
      :class="[
        'inline-block',
        value === 'X' ? 'text-blue-600' : 'text-red-600'
      ]"
      class="motion-preset-bounce"
    >
      {{ value }}
    </span>
  </button>
</template>

<script setup>
defineProps({
  value: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isWinningCell: {
    type: Boolean,
    default: false
  },
  index: {
    type: Number,
    required: true
  }
})

defineEmits(['click'])
</script>
