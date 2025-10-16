import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * ゲーム履歴と統計を管理するストア
 */
export const useGameHistoryStore = defineStore('gameHistory', () => {
  // LocalStorageのキー
  const STORAGE_KEY = 'tic-tac-toe-history'

  // 履歴（最新20件を保持）
  const history = ref([])

  /**
   * LocalStorageから履歴を読み込み
   */
  const loadHistory = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        history.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('履歴の読み込みに失敗しました:', error)
      history.value = []
    }
  }

  /**
   * LocalStorageに履歴を保存
   */
  const saveHistory = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value))
    } catch (error) {
      console.error('履歴の保存に失敗しました:', error)
    }
  }

  /**
   * ゲーム結果を履歴に追加
   */
  const addGame = (gameResult) => {
    history.value.unshift(gameResult)

    // 最新20件のみ保持
    if (history.value.length > 20) {
      history.value = history.value.slice(0, 20)
    }

    saveHistory()
  }

  /**
   * 履歴をクリア
   */
  const clearHistory = () => {
    history.value = []
    saveHistory()
  }

  /**
   * 統計情報
   */
  const stats = computed(() => {
    const xWins = history.value.filter(game => game.winner === 'X').length
    const oWins = history.value.filter(game => game.winner === 'O').length
    const draws = history.value.filter(game => game.isDraw).length
    const total = history.value.length

    return {
      xWins,
      oWins,
      draws,
      total,
      xWinRate: total > 0 ? ((xWins / total) * 100).toFixed(1) : 0,
      oWinRate: total > 0 ? ((oWins / total) * 100).toFixed(1) : 0,
      drawRate: total > 0 ? ((draws / total) * 100).toFixed(1) : 0,
    }
  })

  // 初期化時に履歴を読み込み
  loadHistory()

  return {
    history,
    stats,
    addGame,
    clearHistory,
  }
})
