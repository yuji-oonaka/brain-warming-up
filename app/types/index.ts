// app/types/index.ts
import { GAME_STEP } from '~/constants/game'

// --- プロの技：定数から型を自動生成 ---
// GAME_STEP オブジェクトの「値」のどれか、という型を自動で作ります
// これにより 'START' | 'MEMORIZE' | 'INTERVENTION_NUM' ... と手書きする手間が省けます
export type GameStep = typeof GAME_STEP[keyof typeof GAME_STEP];

// --- 記録用：1回のゲーム全体のデータ ---
export interface GameSession {
  difficultyLevel: number;    // 現在の難易度（1〜5）
  results: {
    step: string;
    isCorrect: boolean;
    responseTimeMs: number;
  }[];
}

// --- 履歴用：保存されるログの形 ---
export interface GameLog {
  date: string;
  memory_score: number;
  touch_speed_ms: number;
  level: number;
}

// --- 素材用：動物カードの形 ---
export interface CardItem {
  id: number;
  name: string;
  imagePath: string;
}