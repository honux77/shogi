# yaneuraou.wasm (vendored)

Source: https://github.com/arashigaoka/YaneuraOu.wasm — npm package `yaneuraou.wasm@0.1.2`.

Files here (`yaneuraou.js`, `yaneuraou.wasm`, `yaneuraou.data`, `yaneuraou.worker.js`) are the
unmodified Emscripten build output from that package, served as static assets instead of being
bundled by Vite, since they rely on relative-URL loading (`locateFile`) and their own worker
spawning that don't play well with a bundler's module graph.

Licensed under GPL-3.0 (see `Copying.txt`), which is part of why this whole project is GPL-3.0-or-later.

Requires a cross-origin-isolated page (`Cross-Origin-Opener-Policy: same-origin` +
`Cross-Origin-Embedder-Policy: require-corp`, configured in `vite.config.ts`) because it allocates
shared `WebAssembly.Memory` for its worker threads. Any production host must send those same
headers, or the engine fails to initialize (e.g. GitHub Pages cannot set custom response headers,
so it will not work there — Vercel/Netlify/Cloudflare Pages can).
