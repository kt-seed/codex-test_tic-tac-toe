<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    :aria-label="`セル ${index + 1}${value ? `: ${value}` : ''}`"
    :class="[
      'w-24 h-24 text-4xl font-bold rounded-2xl border-2 border-white/20',
      'transition-all duration-200 text-slate-100',
      'bg-white/10 hover:bg-white/20 disabled:hover:bg-white/10',
      'focus:outline-none focus:ring-2 focus:ring-purple-400/60 focus:ring-offset-2 focus:ring-offset-slate-950',
      isWinningCell
        ? 'bg-emerald-400/20 border-emerald-300/40 shadow-[0_0_25px_rgba(16,185,129,0.35)]'
        : '',
      value ? 'cursor-default' : 'cursor-pointer'
    ]"
    class="motion-preset-pop"
  >
    <span
      v-if="value"
      :class="[
        'inline-block',
        value === 'X' ? 'text-sky-300 drop-shadow-[0_0_12px_rgba(125,211,252,0.55)]' : 'text-rose-300 drop-shadow-[0_0_12px_rgba(244,114,182,0.55)]'
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
