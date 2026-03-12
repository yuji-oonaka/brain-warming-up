// app/composables/useRPSGame.ts
import { ref } from 'vue'

type Hand = 'gu' | 'choki' | 'pa'
type Instruction = 'win' | 'lose'

export const useRPSGame = () => {
  const currentHand = ref<Hand>('gu')
  const instruction = ref<Instruction>('win')
  const rpsCount = ref(0)
  const startTime = ref(0)
  const REQUIRED_ANSWERS = 3

  const hands: Hand[] = ['gu', 'choki', 'pa']
  const instructions: Instruction[] = ['win', 'lose']

  const setupRPS = () => {
    if (rpsCount.value === 0) startTime.value = Date.now()
    
    // ★ 修正：末尾に 「as Hand」 と 「as Instruction」 を付け加えます
    currentHand.value = hands[Math.floor(Math.random() * hands.length)] as Hand
    instruction.value = instructions[Math.floor(Math.random() * instructions.length)] as Instruction
  }

  const checkRPS = (playerHand: Hand) => {
    const isWin = 
      (playerHand === 'gu' && currentHand.value === 'choki') ||
      (playerHand === 'choki' && currentHand.value === 'pa') ||
      (playerHand === 'pa' && currentHand.value === 'gu')

    const isLose = 
      (playerHand === 'gu' && currentHand.value === 'pa') ||
      (playerHand === 'choki' && currentHand.value === 'gu') ||
      (playerHand === 'pa' && currentHand.value === 'choki')

    const isCorrect = instruction.value === 'win' ? isWin : isLose

    if (isCorrect) {
      rpsCount.value++
      if (rpsCount.value >= REQUIRED_ANSWERS) {
        const totalTime = Date.now() - startTime.value
        rpsCount.value = 0
        return { isFinished: true, totalTime }
      }
      setupRPS()
    }
    return { isFinished: false, totalTime: 0 }
  }

  return { currentHand, instruction, rpsCount, REQUIRED_ANSWERS, setupRPS, checkRPS }
}