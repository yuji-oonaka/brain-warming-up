<script setup lang="ts">
import { computed } from 'vue'

// 1. リーダーから、新しい記録の箱「gameRecords」をもらう
const { memoryScore, rpsScore,saveLog, resetGame, gameRecords, colorScore } = useGame()

onMounted(() => {
  saveLog()
})

// 2. それぞれのタイムを秒に変換（computed なので自動更新されます）
const numSeconds = computed(() => (gameRecords.value.numMs / 1000).toFixed(1))
const mathSeconds = computed(() => (gameRecords.value.mathMs / 1000).toFixed(1))
const rpsSeconds = computed(() => (gameRecords.value.rpsMs / 1000).toFixed(1))
const colorSeconds = computed(() => (gameRecords.value.colorMs / 1000).toFixed(1))

</script>

<template>
  <div class="text-center space-y-6">
    <div class="text-8xl">😺</div>
    
    <div class="bg-white text-slate-900 p-8 rounded-3xl shadow-xl border-b-8 border-slate-300">
      <h2 class="text-2xl font-bold mb-6 text-slate-500">本日のトレーニング完了！</h2>
      
      <div class="space-y-4 mb-6">
        <div class="bg-green-50 p-4 rounded-2xl flex justify-between items-center px-8 border-2 border-green-100">
          <p class="text-slate-500 font-bold text-lg">カード記憶</p>
          <p class="text-4xl font-black text-green-600">{{ memoryScore }} / 3</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div v-if="gameRecords.numMs > 0" class="bg-blue-50 p-4 rounded-2xl border-2 border-blue-100">
            <p class="text-sm text-slate-500 font-bold">数字タッチ</p>
            <p class="text-3xl font-black text-blue-600">{{ numSeconds }}秒</p>
          </div>

          <div v-if="gameRecords.mathMs > 0" class="bg-purple-50 p-4 rounded-2xl border-2 border-purple-100">
            <p class="text-sm text-slate-500 font-bold">計算パズル</p>
            <p class="text-3xl font-black text-purple-600">{{ mathSeconds }}秒</p>
          </div>

          <div v-if="gameRecords.rpsMs > 0" class="bg-orange-50 p-4 rounded-2xl border-2 border-orange-100">
            <p class="text-sm text-slate-500 font-bold">後出しジャンケン</p>
            <p class="text-3xl font-black text-orange-600">{{ rpsScore }} / 3 勝</p>
            <p class="text-xs text-orange-400 mt-1">（{{ rpsSeconds }}秒）</p>
          </div>

          <div v-if="gameRecords.colorMs > 0" class="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-100">
            <p class="text-sm text-slate-500 font-bold">色当てテスト</p>
            <p class="text-3xl font-black text-emerald-600">{{ colorScore }} / 3 正解</p>
            <p class="text-xs text-emerald-400 mt-1">（{{ colorSeconds }}秒）</p>
          </div>
        </div>
      </div>
      
      <div class="bg-slate-100 p-4 rounded-2xl italic">
        <p v-if="memoryScore === 3" class="text-lg text-blue-600 font-bold">
          パーフェクトですにゃ！<br>素晴らしい集中力です！
        </p>
        <p v-else class="text-lg text-slate-600 font-bold">
          惜しかったにゃ。<br>次は全部正解できるはずですよ！
        </p>
      </div>
    </div>

    <button
      @click="resetGame"
      class="w-full py-8 bg-blue-600 text-white rounded-3xl text-2xl font-bold shadow-lg active:scale-95 transition-all"
    >
      もういちど遊ぶ
    </button>
  </div>
</template>