<script setup lang="ts">
// 1. 自分の専門家：checkAnswer からタイムも受け取れるようにします
const { mathQuestion, mathCount, REQUIRED_ANSWERS, setupMath, checkAnswer } = useMathGame()

// 2. 全体のリーダー：報告用の reportTime を追加で受け取ります
const { reportTime, decideNextStep } = useGame()

onMounted(() => {
  setupMath()
})

const onInput = (n: number) => {
  const { isFinished, totalTime } = checkAnswer(n)
  if (isFinished) {
    // 第3引数に REQUIRED_ANSWERS (3) を渡す
    reportTime('math', totalTime, REQUIRED_ANSWERS) 
    decideNextStep()
  }
}

const buttons = Array.from({ length: 18 }, (_, i) => i + 1)
</script>

<template>
  <div class="text-center space-y-6">
    <div class="flex justify-between items-center px-4">
      <span class="text-xl font-bold text-slate-400">計算トレーニング</span>
      <span class="text-2xl font-black text-yellow-400">
        {{ mathCount + 1 }} / {{ REQUIRED_ANSWERS }} 問目
      </span>
    </div>

    <div class="bg-white text-slate-900 py-10 rounded-3xl shadow-xl border-b-8 border-slate-300">
      <div class="text-7xl font-black flex justify-center items-center gap-4">
        <span>{{ mathQuestion.a }}</span>
        <span class="text-4xl text-slate-400">+</span>
        <span>{{ mathQuestion.b }}</span>
        <span class="text-4xl text-slate-400">=</span>
        <span class="text-blue-600">？</span>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-3">
      <button
        v-for="n in buttons"
        :key="n"
        @click="onInput(n)"
        class="py-5 bg-slate-700 hover:bg-slate-600 rounded-2xl text-3xl font-bold shadow-lg active:scale-95 transition-all"
      >
        {{ n }}
      </button>
    </div>
  </div>
</template>