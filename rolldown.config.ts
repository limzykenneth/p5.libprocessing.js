import { defineConfig } from "rolldown";

export default defineConfig([
  {
    input: "src/main.js",
    platform: "node",
    output: {
      file: "dist/p5.libprocessing.min.js",
      format: "iife",
      minify: true,
    },
    external: [/p5\.libprocessing\.js-ffi\..*\.node/],
  },
  {
    input: "src/main.js",
    platform: "node",
    output: {
      file: "dist/p5.libprocessing.esm.js",
      format: "esm",
    },
    external: [/p5\.libprocessing\.js-ffi\..*\.node/],
  },
]);
