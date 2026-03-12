<script setup lang="ts">
const { currentHand, instruction, rpsCount, REQUIRED_ANSWERS, setupRPS, checkRPS } = useRPSGame()
const { reportTime, decideNextStep } = useGame()

onMounted(() => setupRPS())

const handIcons = { gu: '✊', choki: '✌️', pa: '🖐️' }

const onPlay = (hand: 'gu' | 'choki' | 'pa') => {
  const { isFinished, totalTime } = checkRPS(hand)
  if (isFinished) {
    // 第3引数に REQUIRED_ANSWERS (3) を渡す
    reportTime('rps', totalTime, REQUIRED_ANSWERS)
    decideNextStep()
  }
}
</script>

<template>
  <div class="text-center space-y-8">
    <div class="text-2xl font-bold text-slate-400">{{ rpsCount + 1 }} / {{ REQUIRED_ANSWERS }} 問目</div>
    
    <div class="flex flex-col items-center gap-4">
      <div class="text-9xl animate-bounce">{{ handIcons[currentHand] }}</div>
      <div :class="['px-8 py-2 rounded-full text-3xl font-black shadow-lg', 
        instruction === 'win' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white']">
        {{ instruction === 'win' ? '勝って！' : '負けて！' }}
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 px-4">
      <button v-for="(icon, key) in handIcons" :key="key" @click="onPlay(key)"
        class="text-6xl p-6 bg-white rounded-3xl shadow-xl hover:scale-110 active:scale-95 transition-all">
        {{ icon }}
      </button>
    </div>
  </div>
</template>