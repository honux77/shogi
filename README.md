# 쇼기 배우기 (Shogi Learning App)

쇼기(将棋)를 처음 배우는 사람을 위한 웹앱입니다.

- **단계별 룰 학습**: 기물 이동, 성(成), 지문(持ち駒), 이불성(二歩), 외통(詰み) 기초까지 인터랙티브 레슨으로 학습
- **AI와 대국**: 브라우저에서 직접 구동되는 [YaneuraOu](https://github.com/yaneurao/YaneuraOu) NNUE 엔진과 대국 (난이도 3단계)

## 개발

```bash
npm install
npm run dev
```

- `npm run test` — Vitest 유닛 테스트 (규칙/레슨 데이터 검증)
- `npm run build` — 프로덕션 빌드
- `npm run lint` — oxlint

## 배포 시 주의사항

AI 엔진(`yaneuraou.wasm`)은 스레드용 공유 메모리(`SharedArrayBuffer`)가 필요해서, 페이지가
**cross-origin-isolated** 상태여야 동작합니다. 이를 위해 아래 두 응답 헤더가 모든 경로에 걸려야 합니다:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

`vite.config.ts`는 로컬 dev/preview 서버에 이 헤더를 자동으로 설정합니다. `vercel.json`은 Vercel
배포 시 동일한 헤더와 SPA 라우팅(rewrite)을 설정합니다.

**커스텀 응답 헤더를 지원하지 않는 호스팅(예: GitHub Pages)에서는 AI 대국 기능이 동작하지 않습니다.**
Vercel, Netlify, Cloudflare Pages처럼 헤더 설정이 가능한 정적 호스팅을 사용하세요.

## 라이선스

이 프로젝트는 [YaneuraOu](https://github.com/yaneurao/YaneuraOu)와 [shogiops](https://github.com/WandererXII/shogiops) (둘 다 GPL-3.0-or-later)를 사용하므로, 전체가 **GPL-3.0-or-later**로 배포됩니다. 자세한 내용은 [LICENSE](LICENSE)와 [public/engine/README.md](public/engine/README.md)를 참고하세요.
