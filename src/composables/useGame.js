import { ref, computed } from 'vue'

/**
 * 三目並べのゲームロジック
 */
export function useGame() {
  // ボードの状態 (0-8のインデックス、null: 空, 'X': プレイヤー1, 'O': プレイヤー2)
  const board = ref(Array(9).fill(null))

  // 現在のプレイヤー
  const currentPlayer = ref('X')

  // ゲーム終了フラグ
  const gameOver = ref(false)

  // 勝者
  const winner = ref(null)

  // 勝利ラインのインデックス
  const winningLine = ref(null)

  // 勝利パターン
  const winPatterns = [
    [0, 1, 2], // 上段
    [3, 4, 5], // 中段
    [6, 7, 8], // 下段
    [0, 3, 6], // 左列
    [1, 4, 7], // 中列
    [2, 5, 8], // 右列
    [0, 4, 8], // 斜め（左上→右下）
    [2, 4, 6], // 斜め（右上→左下）
  ]

  /**
   * 勝敗判定
   */
  const checkWinner = () => {
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern
      if (
        board.value[a] &&
        board.value[a] === board.value[b] &&
        board.value[a] === board.value[c]
      ) {
        return { winner: board.value[a], line: pattern }
      }
    }
    return null
  }

  /**
   * 引き分け判定
   */
  const isDraw = computed(() => {
    return !winner.value && board.value.every(cell => cell !== null)
  })

  /**
   * セルをクリックした時の処理
   */
  const makeMove = (index) => {
    // ゲーム終了済み、またはすでに埋まっている場合は何もしない
    if (gameOver.value || board.value[index]) {
      return false
    }

    // マークを配置
    board.value[index] = currentPlayer.value

    // 勝敗判定
    const result = checkWinner()
    if (result) {
      gameOver.value = true
      winner.value = result.winner
      winningLine.value = result.line
      return true
    }

    // 引き分け判定
    if (isDraw.value) {
      gameOver.value = true
      return true
    }

    // プレイヤー交代
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    return true
  }

  /**
   * ゲームをリセット
   */
  const resetGame = () => {
    board.value = Array(9).fill(null)
    currentPlayer.value = 'X'
    gameOver.value = false
    winner.value = null
    winningLine.value = null
  }

  /**
   * ゲーム結果を取得（履歴保存用）
   */
  const getGameResult = () => {
    if (!gameOver.value) return null

    return {
      winner: winner.value,
      isDraw: isDraw.value,
      board: [...board.value],
      timestamp: new Date().toISOString(),
    }
  }

  return {
    board,
    currentPlayer,
    gameOver,
    winner,
    winningLine,
    isDraw,
    makeMove,
    resetGame,
    getGameResult,
  }
}
