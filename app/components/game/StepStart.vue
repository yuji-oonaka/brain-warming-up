<script setup lang="ts">
defineEmits<{
  (e: 'start'): void
}>()
</script>

<template>
  <div class="text-center space-y-12">
    <div class="relative inline-block">
      <div class="text-6xl mb-4">😺</div>
      <div class="bg-white text-slate-900 p-4 rounded-2xl rounded-bl-none shadow-lg">
        <p class="text-xl font-bold">準備はいいかにゃ？<br>リラックスして始めましょう！</p>
      </div>
    </div>

    <button 
      @click="$emit('start')"
      class="w-full py-10 bg-green-600 hover:bg-green-500 active:scale-95 transition-all rounded-3xl shadow-2xl border-b-8 border-green-800"
    >
      <span class="text-4xl font-extrabold tracking-widest">はじめる</span>
    </button>
  </div>
</template>