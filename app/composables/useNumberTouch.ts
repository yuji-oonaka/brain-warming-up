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
    if (n === nextNumber.value) {
      nextNumber.value++
      if (nextNumber.value > GAME_SETTINGS.INTERVENTION_MAX) {
        touchSpeedMs.value = Date.now() - startTime.value
        return true // 終了合図
      }
    }
    return false
  }

  return { numbers, nextNumber, touchSpeedMs, setupNumberTouch, handleTouch }
}