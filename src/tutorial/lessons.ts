import type { Lesson } from './types';

/** Both kings are placed off to the side, out of the way, so each lesson SFEN stays a legal position. */
export const LESSONS: Lesson[] = [
  {
    id: 'pawn',
    title: '보(歩) 이동',
    summary: '보는 쇼기에서 가장 흔한 기물로, 앞으로 한 칸씩만 움직일 수 있습니다.',
    initialSfen: '8k/9/9/9/9/9/4P4/9/K8 b - 1',
    steps: [
      {
        prompt: '5g에 있는 보를 앞으로 한 칸 이동해보세요.',
        from: '5g',
        targets: ['5f'],
        successMessage: '정확해요! 보는 앞으로 한 칸씩만 전진합니다.',
      },
    ],
  },
  {
    id: 'lance',
    title: '향차(香) 이동',
    summary: '향차는 앞으로 원하는 만큼 멀리 움직일 수 있습니다 (단, 다른 기물을 뛰어넘을 수는 없어요).',
    initialSfen: '8k/9/9/9/9/9/4L4/9/K8 b - 1',
    steps: [
      {
        prompt: '5g에 있는 향차를 앞으로 세 칸(5d) 이동해보세요.',
        from: '5g',
        targets: ['5d'],
        successMessage: '좋아요! 향차는 앞이 막히기 전까지 원하는 만큼 나아갈 수 있습니다.',
      },
    ],
  },
  {
    id: 'knight',
    title: '계마(桂) 이동',
    summary: '계마는 앞으로 두 칸, 그리고 좌우로 한 칸을 동시에 움직이는 독특한 기물입니다.',
    initialSfen: '8k/9/9/9/9/9/4N4/9/K8 b - 1',
    steps: [
      {
        prompt: '5g에 있는 계마를 4e 또는 6e로 이동해보세요.',
        from: '5g',
        targets: ['4e', '6e'],
        successMessage: '정확해요! 계마는 이 두 칸으로만 움직일 수 있습니다.',
      },
    ],
  },
];
