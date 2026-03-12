<script setup lang="ts">
const { currentQuestion, colorCount, REQUIRED_ANSWERS, setupColor, checkColor, colorOptions } = useColorGame()
const { reportTime, decideNextStep } = useGame()

onMounted(() => setupColor())

const onSelect = (name: string) => {
  const { isFinished, totalTime } = checkColor(name)
  if (isFinished) {
    reportTime('color', totalTime, REQUIRED_ANSWERS)
    decideNextStep()
  }
}
</script>

<template>
  <div class="text-center space-y-8">
    <div class="text-xl font-bold text-slate-400">「文字」ではなく「色」を選んでね</div>

    <div class="bg-white py-12 rounded-3xl shadow-xl border-b-8 border-slate-200">
      <div 
        class="text-8xl font-black transition-all duration-300"
        :style="{ color: currentQuestion.color }"
      >
        {{ currentQuestion.text }}
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="opt in colorOptions"
        :key="opt.name"
        @click="onSelect(opt.name)"
        class="py-6 bg-slate-700 text-white rounded-2xl text-3xl font-bold shadow-lg active:scale-95 hover:bg-slate-600 transition-all"
      >
        {{ opt.name }}
      </button>
    </div>

    <div class="text-2xl font-black text-yellow-400">
      {{ colorCount }} / {{ REQUIRED_ANSWERS }} 問正解
    </div>
  </div>
</template>