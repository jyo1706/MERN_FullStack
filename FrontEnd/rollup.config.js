import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import react from '@rollup/plugin-react';

export default {
  input: 'src/main.jsx',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',  // or 'iife' or 'cjs', depending on your target
    sourcemap: true,
  },
  plugins: [
    resolve(),  // To resolve node modules like 'react-router-dom'
    commonjs(), // To handle commonjs modules
    react()     // To handle React JSX
  ],
  // Make sure 'react-router-dom' is not external if you want to bundle it
  external: ['react', 'react-dom'],  // Keep React and ReactDOM external to avoid bundling them again
};
