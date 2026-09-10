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
        kind: 'move',
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
        kind: 'move',
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
        kind: 'move',
        prompt: '5g에 있는 계마를 4e 또는 6e로 이동해보세요.',
        from: '5g',
        targets: ['4e', '6e'],
        successMessage: '정확해요! 계마는 이 두 칸으로만 움직일 수 있습니다.',
      },
    ],
  },
  {
    id: 'silver',
    title: '은(銀) 이동',
    summary: '은은 앞의 세 칸(좌/정/우)과 뒤 대각선 두 칸으로 움직입니다. 뒤로 똑바로는 못 갑니다.',
    initialSfen: '8k/9/9/9/9/9/4S4/9/K8 b - 1',
    steps: [
      {
        kind: 'move',
        prompt: '5g에 있는 은을 대각선 뒤쪽인 6h로 이동해보세요.',
        from: '5g',
        targets: ['6h'],
        successMessage: '정확해요! 은은 뒤로 갈 때 대각선으로만 움직일 수 있습니다.',
      },
    ],
  },
  {
    id: 'gold',
    title: '금(金) 이동',
    summary: '금은 앞의 세 칸, 좌우, 그리고 바로 뒤로 움직입니다. 은과 반대로 대각선 뒤로는 못 갑니다.',
    initialSfen: '8k/9/9/9/9/9/4G4/9/K8 b - 1',
    steps: [
      {
        kind: 'move',
        prompt: '5g에 있는 금을 바로 뒤인 5h로 이동해보세요.',
        from: '5g',
        targets: ['5h'],
        successMessage: '정확해요! 금은 은과 달리 대각선이 아니라 바로 뒤로만 갈 수 있습니다.',
      },
    ],
  },
  {
    id: 'bishop',
    title: '각행(角) 이동',
    summary: '각행은 대각선 방향으로 막히기 전까지 원하는 만큼 움직일 수 있습니다.',
    initialSfen: '4k4/9/9/9/4B4/9/9/9/K8 b - 1',
    steps: [
      {
        kind: 'move',
        prompt: '5e에 있는 각행을 대각선을 따라 2h로 이동해보세요.',
        from: '5e',
        targets: ['2h'],
        successMessage: '정확해요! 각행은 대각선이라면 어디까지든 갈 수 있습니다.',
      },
    ],
  },
  {
    id: 'rook',
    title: '비차(飛) 이동',
    summary: '비차는 상하좌우 직선 방향으로 막히기 전까지 원하는 만큼 움직일 수 있습니다.',
    initialSfen: '8k/9/9/9/4R4/9/9/9/K8 b - 1',
    steps: [
      {
        kind: 'move',
        prompt: '5e에 있는 비차를 옆으로 2e까지 이동해보세요.',
        from: '5e',
        targets: ['2e'],
        successMessage: '정확해요! 비차는 직선이라면 가로든 세로든 어디까지든 갈 수 있습니다.',
      },
    ],
  },
  {
    id: 'king',
    title: '옥/왕(玉/王) 이동',
    summary: '옥(왕)은 사방 여덟 칸 중 한 칸씩만 움직일 수 있지만, 잡히면 지는 가장 중요한 기물입니다.',
    initialSfen: '8k/9/9/9/4K4/9/9/9/9 b - 1',
    steps: [
      {
        kind: 'move',
        prompt: '5e에 있는 옥을 대각선으로 한 칸인 6f로 이동해보세요.',
        from: '5e',
        targets: ['6f'],
        successMessage: '정확해요! 옥은 어느 방향으로든 한 칸씩 움직일 수 있습니다.',
      },
    ],
  },
  {
    id: 'promotion',
    title: '성(成) — 기물의 승급',
    summary:
      '대부분의 기물은 상대 진영 세 줄(적진) 안으로 들어가거나 그 안에서 움직이면 "성"할지 선택할 수 있습니다. 성하면 더 강한 기물로 바뀝니다.',
    initialSfen: '4k4/9/9/4S4/9/9/9/9/K8 b - 1',
    steps: [
      {
        kind: 'move',
        prompt: '5d에 있는 은을 적진 안인 5c로 이동해보세요. 이동 후 성 여부를 선택할 수 있습니다.',
        from: '5d',
        targets: ['5c'],
        successMessage: '정확해요! 적진에 들어가면 성 여부를 직접 선택할 수 있습니다 (성한 은은 금처럼 움직입니다).',
      },
    ],
  },
  {
    id: 'drop-basics',
    title: '지문(持ち駒) — 잡은 말 되쓰기',
    summary:
      '쇼기의 가장 독특한 규칙: 상대 기물을 잡으면 내 것이 되어 손에 들어옵니다. 자기 차례에 손에 있는 기물을 빈 칸에 "드롭"할 수 있습니다.',
    initialSfen: '8k/9/9/9/9/9/9/9/K8 b P 1',
    steps: [
      {
        kind: 'drop',
        prompt: '손에 있는 보(歩)를 선택해서 5e에 놓아보세요.',
        role: 'pawn',
        targets: ['5e'],
        successMessage: '정확해요! 이렇게 잡은 기물을 내 편으로 만들어 다시 사용할 수 있습니다.',
      },
    ],
  },
  {
    id: 'nifu',
    title: '이불성(二歩) 반칙',
    summary:
      '같은 줄(파일)에 이미 내 보가 있으면, 그 줄에는 보를 드롭할 수 없습니다. 이를 "이불성"이라고 하며 반칙입니다.',
    initialSfen: '8k/9/9/9/9/9/4P4/9/K8 b P 1',
    steps: [
      {
        kind: 'drop',
        prompt:
          '이미 5번 줄에 보가 있어서 그 줄에는 드롭할 수 없어요. 손에 있는 보를 선택해서 다른 줄인 3f에 놓아보세요.',
        role: 'pawn',
        targets: ['3f'],
        successMessage: '정확해요! 5번 줄이 목록에서 빠져있던 이유가 바로 이불성 규칙 때문입니다.',
      },
    ],
  },
  {
    id: 'checkmate-puzzle',
    title: '외통(詰み) 맛보기',
    summary:
      '외통이란 옥이 어디로도 피할 수 없는 상태를 말합니다. 계마가 2a와 4a를 지키고 있는 지금, 금을 손에 들고 있습니다.',
    initialSfen: '8k/8p/6N2/9/9/9/9/9/K8 b G 1',
    steps: [
      {
        kind: 'drop',
        prompt: '손에 있는 금을 선택해서 2a에 놓아 외통을 만들어보세요.',
        role: 'gold',
        targets: ['2a'],
        successMessage:
          '외통입니다! 1b는 자기 편 보라 못 가고, 2b는 방금 놓은 금이 직접 지키고 있고, 2a는 계마가 지키고 있어 옥이 도망갈 곳이 없습니다.',
      },
    ],
  },
];
