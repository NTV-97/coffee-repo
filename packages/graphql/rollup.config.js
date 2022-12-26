import typescript from 'rollup-plugin-typescript2';
import alias from '@rollup/plugin-alias';
import jsx from 'acorn-jsx';
import path from 'path';
import pkg from './package.json';

export default {
  input: './*',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    alias({
      entries: {
        src: path.resolve(__dirname, './'),
      },
    }),
    typescript({
      typescript: require('typescript'),
      tsconfigDefaults: {
        compilerOptions: {
          plugins: [
            { transform: 'typescript-transform-paths' },
            { transform: 'typescript-transform-paths', afterDeclarations: true },
          ],
        },
      },
    }),
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  acornInjectPlugins: [jsx()],
};
