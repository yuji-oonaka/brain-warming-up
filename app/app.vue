<script setup lang="ts">
// 定数をインポートして、テンプレート（HTML側）で使えるようにします
import { GAME_STEP } from '~/constants/game'

// 司令塔から、現在のステップと「次を決める関数」などを取得します
const { currentStep, startGame, decideNextStep } = useGame()
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-white font-sans selection:bg-green-500">
    <main class="max-w-2xl mx-auto px-4 py-8 min-h-screen flex flex-col">
      
      <header class="text-center mb-4">
        <h1 class="text-2xl font-bold opacity-70">脳のウォーミングアップ</h1>
      </header>

      <div class="flex-1 flex flex-col justify-start sm:justify-center">
        <GameStepStart 
          v-if="currentStep === GAME_STEP.START" 
          @start="startGame" 
        />

        <GameStepMemorize 
          v-else-if="currentStep === GAME_STEP.MEMORIZE" 
          @complete="decideNextStep" 
        />

        <GameStepIntervention 
          v-else-if="currentStep === GAME_STEP.INTERVENTION_NUM" 
        />

        <GameStepMath 
          v-else-if="currentStep === GAME_STEP.INTERVENTION_MATH" 
        />
        
        <GameStepRecall 
          v-else-if="currentStep === GAME_STEP.RECALL" 
        />

        <GameStepRPS 
          v-else-if="currentStep === GAME_STEP.INTERVENTION_RPS" 
        />

        <GameStepColor 
          v-else-if="currentStep === GAME_STEP.INTERVENTION_COLOR"
        />
        
        <GameStepResult 
          v-else-if="currentStep === GAME_STEP.RESULT" 
        />
      </div>

    </main>
  </div>
</template>

<style>
/* ボタンを押した時の「手応え」を演出 */
button:active {
  transform: scale(0.96);
  transition: transform 0.1s;
}
</style>