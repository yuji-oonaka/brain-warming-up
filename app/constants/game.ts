// app/constants/game.ts
import type { CardItem } from '~/types';

export const ALL_CARDS: CardItem[] = [
  { id: 1, name: 'ねこ', imagePath: '/images/animal/cat.png' },
  { id: 2, name: 'いぬ', imagePath: '/images/animal/dog.png' },
  { id: 3, name: 'きりん', imagePath: '/images/animal/kirin.png' },
  { id: 4, name: 'らいおん', imagePath: '/images/animal/lion.png' },
  { id: 5, name: 'さる', imagePath: '/images/animal/monkey.png' },
  { id: 6, name: 'ぱんだ', imagePath: '/images/animal/panda.png' },
  { id: 7, name: 'ぺんぎん', imagePath: '/images/animal/penguin.png' },
  { id: 8, name: 'ぶた', imagePath: '/images/animal/pig.png' },
  { id: 9, name: 'とら', imagePath: '/images/animal/tora.png' },
  { id: 10, name: 'うま', imagePath: '/images/animal/uma.png' },
  { id: 11, name: 'うし', imagePath: '/images/animal/usi.png' },
  { id: 12, name: 'ぞう', imagePath: '/images/animal/zou.png' },
];

export const GAME_SETTINGS = {
  MEMORIZE_COUNT: 3,
  INTERVENTION_MAX: 16,
  BASE_FONT_SIZE: '24px',
};

export const GAME_STEP = {
  START: 'START',
  MEMORIZE: 'MEMORIZE',
  INTERVENTION_NUM: 'INTERVENTION_NUM',
  INTERVENTION_MATH: 'INTERVENTION_MATH',
  INTERVENTION_RPS: 'INTERVENTION_RPS', // ★追加：ジャンケン
  INTERVENTION_COLOR: 'INTERVENTION_COLOR',
  RECALL: 'RECALL',
  RESULT: 'RESULT'
} as const