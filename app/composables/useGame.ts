// app/composables/useGame.ts
import { ref } from 'vue'
import type { GameStep, CardItem, GameLog } from '~/types'
import { ALL_CARDS, GAME_SETTINGS, GAME_STEP } from '~/constants/game'

// --- 共通の状態（Singleton State） ---
const currentStep = ref<GameStep>(GAME_STEP.START)
const targetCards = ref<CardItem[]>([])
const difficultyLevel = ref(1)
const interventionCount = ref(0)
const MAX_INTERVENTIONS = 2 
const selectedIds = ref<number[]>([])
const memoryScore = ref(0)
const rpsScore = ref(0)
const mathScore = ref(0)
const colorScore = ref(0)

// ★ 修正：1つのタイムではなく、ゲームごとの記録を保持する
const gameRecords = ref({
  numMs: 0,
  mathMs: 0,
  rpsMs: 0,
  colorMs: 0,
})

export const useGame = () => {
  const startGame = () => {
    const shuffled = [...ALL_CARDS].sort(() => Math.random() - 0.5)
    targetCards.value = shuffled.slice(0, GAME_SETTINGS.MEMORIZE_COUNT)
    
    // 記録もリセット
    gameRecords.value = { numMs: 0, mathMs: 0, rpsMs: 0, colorMs: 0 }
    currentStep.value = GAME_STEP.MEMORIZE
  }

  // ★ 修正：どのゲームの報告かを「type」で受け取るようにする
  const reportTime = (type: 'num' | 'math' | 'rps'| 'color', ms: number, score?: number) => {
    if (type === 'num') {
      gameRecords.value.numMs = ms
    }
    
    if (type === 'math') {
      gameRecords.value.mathMs = ms
      if (score !== undefined) mathScore.value = score // スコアがあれば保存
    }
    
    if (type === 'rps') {
      gameRecords.value.rpsMs = ms
      if (score !== undefined) rpsScore.value = score // スコアがあれば保存
    }

    if (type === 'color') {
      gameRecords.value.colorMs = ms
      if (score !== undefined) colorScore.value = score
    }
    console.log(`司令塔：${type}の記録（${ms}ms / ${score}点）を更新しました`)
  }

  const decideNextStep = () => {
    if (interventionCount.value >= MAX_INTERVENTIONS) {
      interventionCount.value = 0
      currentStep.value = GAME_STEP.RECALL
      return
    }

    interventionCount.value++
    const games = [
      GAME_STEP.INTERVENTION_NUM, 
      GAME_STEP.INTERVENTION_MATH, 
      GAME_STEP.INTERVENTION_RPS,
      GAME_STEP.INTERVENTION_COLOR
    ]
    const nextGame = games[Math.floor(Math.random() * games.length)] as GameStep
    currentStep.value = nextGame
  }

  const submitRecall = () => {
    const targetIds = targetCards.value.map((c: CardItem) => c.id)
    memoryScore.value = selectedIds.value.filter((id: number) => targetIds.includes(id)).length
    currentStep.value = GAME_STEP.RESULT
  }

  const toggleSelection = (id: number) => {
    if (selectedIds.value.includes(id)) {
      selectedIds.value = selectedIds.value.filter((i: number) => i !== id)
    } else if (selectedIds.value.length < 3) {
      selectedIds.value.push(id)
    }
  }

  const saveLog = () => {
    if (import.meta.server) return
    const newLog: GameLog = {
      date: new Date().toISOString(),
      memory_score: memoryScore.value,
      // ログにはとりあえず数字タッチか計算の大きい方のタイムを入れる（後で集計用に拡張可能）
      touch_speed_ms: Math.max(gameRecords.value.numMs, gameRecords.value.mathMs),
      level: difficultyLevel.value
    }
    const savedData = localStorage.getItem('brain_warmup_logs')
    const logs = savedData ? JSON.parse(savedData).logs : []
    logs.push(newLog)
    localStorage.setItem('brain_warmup_logs', JSON.stringify({ logs }))
  }

  const resetGame = () => {
    selectedIds.value = []
    memoryScore.value = 0
    interventionCount.value = 0
    gameRecords.value = { numMs: 0, mathMs: 0, rpsMs: 0 , colorMs: 0 }
    currentStep.value = GAME_STEP.START
    rpsScore.value = 0
  }

  return {
    currentStep,
    targetCards,
    difficultyLevel,
    selectedIds,
    memoryScore,
    gameRecords, // これを公開
    reportTime,   // これを公開
    startGame,
    decideNextStep,
    submitRecall,
    resetGame,
    toggleSelection,
    saveLog,
    rpsScore,
    mathScore,
    colorScore
  }
}