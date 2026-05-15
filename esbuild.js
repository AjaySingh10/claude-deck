const esbuild = require('esbuild');
const isWatch = process.argv.includes('--watch');

const ctx = esbuild.context({
  entryPoints: ['src/extension.ts'],
  bundle: true,
  outfile: 'dist/extension.js',
  external: ['vscode'],
  format: 'cjs',
  platform: 'node',
  target: 'node18',
  sourcemap: true,
  minify: !isWatch,
});

ctx.then(c => isWatch ? c.watch() : c.rebuild().then(() => { console.log('Build complete'); process.exit(0); }))
  .catch(() => process.exit(1));
