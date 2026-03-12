<script setup lang="ts">
import { ALL_CARDS } from '~/constants/game'

// useGame（リーダー）から、想起に必要な道具を借りてきます
const { selectedIds, toggleSelection, submitRecall } = useGame()
</script>

<template>
  <div class="text-center space-y-4">
    <h2 class="text-2xl font-bold text-green-400">どの動物がいたかな？</h2>
    <p class="text-lg">覚えているものを <span class="text-yellow-400 font-bold">3つ</span> 選んでにゃ！</p>

    <div class="grid grid-cols-3 gap-3 max-w-md mx-auto pb-8">
      <button
        v-for="card in ALL_CARDS"
        :key="card.id"
        @click="toggleSelection(card.id)"
        :class="[
          'p-1.5 rounded-2xl transition-all border-4 bg-white shadow-md active:scale-95',
          selectedIds.includes(card.id) 
            ? 'border-yellow-500 scale-105 z-10' 
            : 'border-transparent opacity-90'
        ]"
      >
        <div class="aspect-square flex items-center justify-center overflow-hidden">
          <img :src="card.imagePath" class="w-full h-full object-contain p-1" />
        </div>
        <p class="text-slate-900 text-[10px] sm:text-xs font-bold mt-1">{{ card.name }}</p>
      </button>
    </div>

    <div class="sticky bottom-4 left-0 right-0 px-4 pb-4 bg-slate-900/80 backdrop-blur-sm pt-2">
      <button
        v-if="selectedIds.length === 3"
        @click="submitRecall"
        class="w-full py-6 bg-green-600 hover:bg-green-500 rounded-3xl shadow-2xl text-white text-3xl font-black transition-all active:scale-95"
      >
        これに決めた！
      </button>
      <div v-else class="text-slate-400 py-6 text-xl font-bold border-2 border-dashed border-slate-700 rounded-3xl">
        あと {{ 3 - selectedIds.length }} つ選んでね
      </div>
    </div>
  </div>
</template>