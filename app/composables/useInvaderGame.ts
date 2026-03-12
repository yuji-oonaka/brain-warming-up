// app/composables/useInvaderGame.ts
import { ref } from 'vue'

export const useInvaderGame = () => {
  const score = ref(0)
  const isGameOver = ref(false)
  const enemyPos = ref({ x: 50, y: 0 }) // 敵の位置（％）

  // 敵を動かす処理
  const update = () => {
    if (isGameOver.value) return
    enemyPos.value.y += 0.5 // 少しずつ下に落ちてくる
    
    if (enemyPos.value.y > 90) {
      isGameOver.value = true // 地面に付いたらゲームオーバー
    }
  }

  // 敵を撃退（タップ）したとき
  const hit = () => {
    score.value++
    enemyPos.value.y = 0 // 上に戻る
    enemyPos.value.x = Math.random() * 80 + 10 // 横位置をランダムに
  }

  return { enemyPos, score, isGameOver, update, hit }
}