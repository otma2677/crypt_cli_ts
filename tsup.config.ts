import { defineConfig } from 'tsup';

export default defineConfig({
  outDir: 'bin',
  clean: true,
  cjsInterop: true,
  minify: true,
  minifySyntax: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  treeshake: true,
  shims: true,
  format: [ 'esm' ]
});
