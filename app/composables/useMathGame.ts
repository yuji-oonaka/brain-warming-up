// app/composables/useMathGame.ts
import { ref } from 'vue'

export const useMathGame = () => {
  const mathQuestion = ref({ a: 0, b: 0, answer: 0 })
  const mathCount = ref(0)
  const startTime = ref(0) 
  const REQUIRED_ANSWERS = 3

  const setupMath = () => {
    if (mathCount.value === 0) {
      startTime.value = Date.now()
    }
    const a = Math.floor(Math.random() * 9) + 1
    const b = Math.floor(Math.random() * 9) + 1
    mathQuestion.value = { a, b, answer: a + b }
  }

  // ★ここを修正：戻り値を { isFinished, totalTime } という形にします
  const checkAnswer = (input: number) => {
    if (input === mathQuestion.value.answer) {
      mathCount.value++
      
      if (mathCount.value >= REQUIRED_ANSWERS) {
        const totalTime = Date.now() - startTime.value
        mathCount.value = 0 
        // true ではなく、情報をまとめた「オブジェクト」を返す
        return { isFinished: true, totalTime } 
      }
      setupMath()
    }
    // false ではなく、形を揃えた「オブジェクト」を返す
    return { isFinished: false, totalTime: 0 }
  }

  return {
    mathQuestion,
    mathCount,
    REQUIRED_ANSWERS,
    setupMath,
    checkAnswer
  }
}