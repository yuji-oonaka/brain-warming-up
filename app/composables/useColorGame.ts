// app/composables/useColorGame.ts
import { ref } from 'vue'

export const useColorGame = () => {
  const colorOptions = [
    { name: 'あか', value: '#ef4444' },
    { name: 'あお', value: '#3b82f6' },
    { name: 'みどり', value: '#22c55e' },
    { name: 'きいろ', value: '#eab308' }
  ]

  const currentQuestion = ref({ text: '', color: '', correctName: '' })
  const colorCount = ref(0)
  const startTime = ref(0)
  const REQUIRED_ANSWERS = 3

  const setupColor = () => {
    if (colorCount.value === 0) startTime.value = Date.now()

    const textIdx = Math.floor(Math.random() * colorOptions.length)
    const colorIdx = Math.floor(Math.random() * colorOptions.length)
    
    // ★ 修正ポイント：取り出した直後に「型」を断定します
    // これにより、TypeScriptは「undefinedじゃないんだな」と納得してくれます
    const textOption = colorOptions[textIdx] as { name: string; value: string }
    const colorOption = colorOptions[colorIdx] as { name: string; value: string }

    currentQuestion.value = {
      text: textOption.name,
      color: colorOption.value,
      correctName: colorOption.name
    }
  }

  const checkColor = (selectedName: string) => {
    if (selectedName === currentQuestion.value.correctName) {
      colorCount.value++
      if (colorCount.value >= REQUIRED_ANSWERS) {
        const totalTime = Date.now() - startTime.value
        colorCount.value = 0
        return { isFinished: true, totalTime }
      }
      setupColor()
    }
    return { isFinished: false, totalTime: 0 }
  }

  return { currentQuestion, colorCount, REQUIRED_ANSWERS, setupColor, checkColor, colorOptions }
}