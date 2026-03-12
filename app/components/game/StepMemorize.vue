<script setup lang="ts">
// nextStep は app.vue 側で制御するため、ここでは不要になります
const { targetCards } = useGame()

// 親コンポーネント（app.vue）に完了を伝えるイベントを定義
defineEmits<{
  (e: 'complete'): void
}>()
</script>

<template>
  <div class="text-center space-y-10">
    <h2 class="text-4xl font-bold text-green-400 mb-4">この3つを覚えてね</h2>
    
    <div class="flex justify-center gap-4 px-2">
      <div 
        v-for="card in targetCards" 
        :key="card.id"
        class="bg-white p-4 rounded-3xl shadow-xl w-1/3 max-w-[200px]"
      >
        <div class="aspect-square flex items-center justify-center bg-slate-50 rounded-2xl mb-2 overflow-hidden">
          <img 
            :src="card.imagePath" 
            :alt="card.name"
            class="w-full h-full object-contain"
          />
        </div>
        <p class="text-slate-900 text-2xl font-black">{{ card.name }}</p>
      </div>
    </div>

    <div class="mt-12">
      <button 
        @click="$emit('complete')"
        class="w-full py-10 bg-blue-600 hover:bg-blue-500 rounded-3xl shadow-2xl active:scale-95 transition-all text-white"
      >
        <span class="text-4xl font-extrabold">覚えた！</span>
      </button>
    </div>
  </div>
</template>