import { defineConfig } from 'rolldown';

export default defineConfig([
	{
	  input: 'src/main.js',
	  output: {
      file: 'dist/p5.libprocessing.min.js',
			format: 'iife',
			minify: true
	  }
	},
	{
    input: 'src/main.js',
    output: {
      file: 'dist/p5.libprocessing.esm.js',
      format: 'esm'
    }
  }
]);