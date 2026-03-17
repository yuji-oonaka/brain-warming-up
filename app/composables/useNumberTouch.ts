// app/composables/useNumberTouch.ts
import { ref } from 'vue'
import { GAME_SETTINGS } from '~/constants/game'

export const useNumberTouch = () => {
  const numbers = ref<number[]>([])
  const nextNumber = ref(1)
  const startTime = ref(0)
  const touchSpeedMs = ref(0)

  // 数字の準備
  const setupNumberTouch = () => {
    const arr = Array.from({ length: GAME_SETTINGS.INTERVENTION_MAX }, (_, i) => i + 1)
    numbers.value = arr.sort(() => Math.random() - 0.5)
    nextNumber.value = 1
    startTime.value = Date.now()
  }

  // タップ判定：終わったら true を返す
  const handleTouch = (n: number) => {
    if (n !== nextNumber.value) return false // そもそも違う数字なら何もしない

    // ★「今押したのが最大値か？」を先に判定する
    if (n === GAME_SETTINGS.INTERVENTION_MAX) {
      touchSpeedMs.value = Date.now() - startTime.value
      // ここで nextNumber を増やさずに終わることで、画面が「17」にならない！
      return true 
    }

    // 最大値じゃない時だけ、次へ進める
    nextNumber.value++
    return false
  }

  return { numbers, nextNumber, touchSpeedMs, setupNumberTouch, handleTouch }
}