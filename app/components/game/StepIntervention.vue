<script setup lang="ts">
// 専門家（useNumberTouch）からタイムの結果「touchSpeedMs」をもらっておく
const { numbers, nextNumber, setupNumberTouch, handleTouch, touchSpeedMs } = useNumberTouch()

// 司令塔（useGame）から報告用の「reportTime」をもらっておく
const { reportTime, decideNextStep } = useGame()

onMounted(() => {
  setupNumberTouch()
})

const onTouch = (n: number) => {
  if (handleTouch(n)) {
    reportTime('num', touchSpeedMs.value) // 'num' として報告
    decideNextStep()
  }
}
</script>

<template>
  <div class="text-center space-y-6">
    <div class="bg-blue-900/50 p-4 rounded-2xl inline-block border-2 border-blue-400">
      <p class="text-2xl font-bold text-blue-200">
        次は <span class="text-5xl text-yellow-400">{{ nextNumber > 16 ? 16 : nextNumber }}</span> を押してにゃ！
      </p>
    </div>

    <div class="grid grid-cols-4 gap-3 max-w-md mx-auto">
      <button
        v-for="n in numbers"
        :key="n"
        @click="onTouch(n)"
        :class="[
          'aspect-square text-3xl font-black rounded-2xl transition-all shadow-lg active:scale-90',
          n < nextNumber 
            ? 'bg-slate-700 text-slate-500 opacity-20 pointer-events-none' 
            : 'bg-white text-slate-900 border-b-4 border-slate-300 hover:bg-slate-100'
        ]"
      >
        {{ n }}
      </button>
    </div>
  </div>
</template>