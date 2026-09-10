// Classic (non-module) worker: yaneuraou.js is an Emscripten UMD build that
// expects `importScripts`, not an ES import, and attaches itself to `self`.
importScripts('/engine/yaneuraou.js');

let engineModule = null;
const pendingCommands = [];

self.YaneuraOu({
  locateFile: (path) => `/engine/${path}`,
  // Our own wrapper worker has no `document`, so yaneuraou.js can't infer its own
  // script URL to spawn pthread sub-workers from. Tell it explicitly.
  mainScriptUrlOrBlob: '/engine/yaneuraou.js',
}).then((mod) => {
  engineModule = mod;
  mod.addMessageListener((line) => self.postMessage(line));
  for (const command of pendingCommands) mod.postMessage(command);
  pendingCommands.length = 0;
});

self.onmessage = (event) => {
  const command = event.data;
  if (engineModule) engineModule.postMessage(command);
  else pendingCommands.push(command);
};
